import PhotoModel from "./models/PhotoModel.js";
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import multer from 'multer';
import Jimp from "jimp";

import {BlobServiceClient} from "@azure/storage-blob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.post('/api/project/:projectName', upload.single('file'), (req, res) => {
	const projectName = normalizeProjectName(req.params.projectName);
	uploadFile(projectName, req.body.connectionString, req.file)
		.then(red => {
			res.json();
		})
		.catch(error => {
			res.status(500).send(error);
		});

});

app.get('/api/project/:projectName', (req, res) => {
	const projectName = normalizeProjectName(req.params.projectName);
	getFiles(projectName, req.query.connectionString)
		.then(blobs => {
			const data = blobs.map(blob => new PhotoModel(blob.name, blob.url));
			res.json(data);
		})
		.catch(error => {
			res.status(500).send(error);
		})
});

app.listen(port, () => {
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
	let squareImage = await square(file);
	return blockedBlobClient.upload(squareImage, squareImage.length, options);
}

async function square(file) {
	try {
		const image = await Jimp.read(file.buffer);
		const size = Math.min(image.bitmap.width, image.bitmap.height);
		const squareImage = new Jimp(size, size);
		const x0 = Math.max(0, Math.floor((image.bitmap.width - size) / 2));
		const y0 = Math.max(0, Math.floor((image.bitmap.height - size) / 2));
		image.scan(x0, y0, size, size, (x, y, idx) => {
			const red = image.bitmap.data[idx];
			const green = image.bitmap.data[idx + 1];
			const blue = image.bitmap.data[idx + 2];
			const alpha = image.bitmap.data[idx + 3];
			squareImage.setPixelColor(Jimp.rgbaToInt(red, green, blue, alpha), x - x0, y - y0);
		});
		return await squareImage.getBufferAsync(image.getMIME());
	} catch (err) {
		throw err;
	}
}

function normalizeProjectName(projectName) {
	return projectName.toLocaleLowerCase().replaceAll(' ', '').trim();
}