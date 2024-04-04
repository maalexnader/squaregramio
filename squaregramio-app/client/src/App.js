import React, {useState} from "react";
import "./App.css";
import Button from "./ds/Button";
import TextField from "./ds/TextField";
import ImageList from "./ds/ImageList";
import LoadingState from "./LoadingState";

function App() {

	const [projectName, setProjectName] = useState('');
	const [loadingState, setLoadingState] = useState(undefined);
	const switchToProject = () => {
		reload();
	}

	const reload = () => {
		setLoadingState(new LoadingState(LoadingState.State.LOADING, null));
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
			<ImageList loadingState={loadingState}></ImageList>
			<footer>
				<a className="bodySStrong colorTextPrimary" href="mailto:support@me.com">support@me.com</a>
				<span className="subheadingS colorTextPrimary">© No Copyright 2024</span>
			</footer>
		</div>
	);
}

export default App;
