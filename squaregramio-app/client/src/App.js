import React, {useState} from "react";
import "./App.css";
import Button from "./ds/Button";
import TextField from "./ds/TextField";
import ImageList from "./ds/ImageList";
import LoadingState from "./LoadingState";

function App() {

	const [projectName, setProjectName] = useState('');
	const [connectionString, setConnectionString] = useState('');

	const [loadingState, setLoadingState] = useState(undefined);
	const switchToProject = () => {
		reload();
	}

	const reload = () => {
		setLoadingState(new LoadingState(LoadingState.State.LOADING, null));
		fetch(`/api/project/${encodeURIComponent(projectName)}?connectionString=${encodeURIComponent(connectionString)}`, {method: 'GET'})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					console.log('Project error');
				}
			})
			.then((data) => {
				setLoadingState(new LoadingState(LoadingState.State.LOADED, data));
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const handleProjectNameChange = (newValue) => {
		setProjectName(newValue);
	}

	const handleConnectionStringChange = (newValue) => {
		setConnectionString(newValue);
	}

	const uploadFile = (file) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('connectionString', connectionString);
		fetch(`/api/project/${encodeURIComponent(projectName)}`, {
			method: 'POST',
			body: formData,
		}).then((response) => {
			reload();
		}).catch();
	}

	return (
		<div className="app">
			<header className="centeredContainer">
				<h1 className="title colorBrand">Squaregram.io</h1>
			</header>
			<div className="project-name">
				<div className="fields">
					<TextField placeholder={'Project name'} value={projectName}
							   onValueChanged={handleProjectNameChange}></TextField>
					<TextField placeholder={'Connection string'} value={connectionString}
							   onValueChanged={handleConnectionStringChange}></TextField>
				</div>
				<Button onClick={switchToProject} title={'Open project'}></Button>
			</div>
			<ImageList loadingState={loadingState} uploadFile={uploadFile}></ImageList>
			<footer>
				<a className="bodySStrong colorTextPrimary" href="mailto:support@me.com">support@me.com</a>
				<span className="subheadingS colorTextPrimary">© No Copyright 2024</span>
			</footer>
		</div>
	);
}

export default App;
