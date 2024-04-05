import PhotoModel from "./models/PhotoModel.js";
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import multer from 'multer';

import {BlobBatchClient, BlobServiceClient} from "@azure/storage-blob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.post('/api/project/:projectName', upload.single('file'), (req, res) => {
	uploadFile(req.params.projectName, req.body.connectionString, req.file)
		.catch();
	res.json();
});

app.get('/api/project/:projectName', (req, res) => {
	getFiles(req.params.projectName, req.query.connectionString)
		.then(blobs => {
			const data = blobs.map(blob => new PhotoModel(blob.name, blob.url));
			res.json(data);
		})
		.catch()
});

app.listen(3000, () => {
	console.log('Server is running at http://localhost:3000');
});

async function getFiles(containerName, connectionString) {
	const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
	const containerClient = blobServiceClient.getContainerClient(containerName);
	await containerClient.createIfNotExists();
	await containerClient.setAccessPolicy('blob');
	let blobsList = containerClient.listBlobsFlat();
	let blobPaths = [];
	for await (const blob of blobsList) {
		const blobClient = containerClient.getBlobClient(blob.name);
		blobPaths.push({name: blob.name, url: blobClient.url});
	}
	return blobPaths;
}

async function uploadFile(containerName, connectionString, file) {
	const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
	const containerClient = blobServiceClient.getContainerClient(containerName);
	const options = {blobHTTPHeaders: {blobContentType: file.mimetype}};
	const blobName = file.originalname;
	let blockedBlobClient = containerClient.getBlockBlobClient(blobName);
	return blockedBlobClient.upload(file.buffer, file.buffer.length, options);
}