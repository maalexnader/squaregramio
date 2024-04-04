import React, {useState} from "react";
import "./App.css";
import Button from "./ds/Button";
import TextField from "./ds/TextField";
import ImageList from "./ds/ImageList";


function App() {

	const [projectName, setProjectName] = useState('');
	const switchToProject = () => {
		console.log(projectName);
	}

	const handleProjectNameChange = (newValue) => {
		setProjectName(newValue);
	}

	return (
		<div className="app">
			<header className="centeredContainer">
				<h1 className="title colorBrand">Squaregram.io</h1>
			</header>
			<div className="project-name">
				<TextField placeholder={'Enter your project name'} value={projectName}
						   onValueChanged={handleProjectNameChange}></TextField>
				<Button onClick={switchToProject} title={'Switch'}></Button>
			</div>
			<ImageList></ImageList>
			<footer>
				<a className="bodySStrong colorTextPrimary" href="mailto:support@me.com">support@me.com</a>
				<span className="subheadingS colorTextPrimary">© No Copyright 2024</span>
			</footer>
		</div>
	);
}

export default App;
