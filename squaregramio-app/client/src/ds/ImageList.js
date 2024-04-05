import React from 'react';
import './ImageList.css';
import LoadingState from "../LoadingState";
import PhotoModel from "models/PhotoModel";

const ImageList = ({loadingState, uploadFile}) => {
	let uploadRef = React.createRef();

	const selectFile = (ev) => {
		const input = uploadRef.current;
		input.click();
	}

	const upload = () => {
		const input = uploadRef.current;
		uploadFile(input.files[0]);
	}

	return (
		<div className="image-list">
			<h2 className="subheadingM colorTextPrimary">Photos in this project</h2>
			<div className={loadingState !== undefined ? "empty hidden" : "empty"}>
				<span className="title colorBrand">Back when Instagram was all square</span>
			</div>
			<div
				className={!loadingState || loadingState.state !== LoadingState.State.LOADING ? "loader hidden" : "loader"}>
				<img className="front" src="/photo.stack.fill.svg" alt="Loader front"/>
				<img className="back" src="/photo.stack.svg" alt="Loader back"/>
			</div>
			<div
				className={loadingState && loadingState.state === LoadingState.State.LOADED ? "items" : "items hidden"}>
				{loadingState && loadingState.value && loadingState.value.map((item, index) => (
					<div key={item.downloadUrl} className="item">
						<h3 className="bodyMStrong colorTextPrimary">{item.name}</h3>
						<a href={item.downloadUrl} target="_blank"><img src="/arrow.down.circle.svg"
																		alt="Download"/></a>
					</div>
				))}
			</div>
			<input id="upload" ref={uploadRef} type="file" className="hidden" onChange={upload}/>
			<img
				className={loadingState && loadingState.state === LoadingState.State.LOADED ? "upload" : "upload hidden"}
				src="/square.and.arrow.up.circle.fill.svg" alt="Upload" title="Upload" onClick={selectFile}/>
		</div>
	);
}

export default ImageList;