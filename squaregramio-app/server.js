import PhotoModel from "./models/PhotoModel.js";
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get('/api/project', (req, res) => {
	const data = [
		new PhotoModel("IMG_1.jpeg", "IMG_1.jpeg"),
		new PhotoModel("IMG_2.jpeg", "IMG_2.jpeg"),
		new PhotoModel("IMG_3.jpeg", "IMG_3.jpeg")
	];
	res.json(data);
});

app.listen(3000, () => {
	console.log('Server is running at http://localhost:3000');
});