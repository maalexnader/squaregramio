import React from 'react';
import './ImageList.css';
import LoadingState from "../LoadingState";

const ImageList = ({loadingState}) => {
	return (
		<div className="image-list">
			<div className={loadingState !== undefined ? "empty hidden" : "empty"}>
				<span className="title colorBrand">Back when Instagram was all square</span>
			</div>
			<div
				className={!loadingState || loadingState.state !== LoadingState.State.LOADING ? "loader hidden" : "loader"}>
				<img className="front" src="/photo.stack.fill.svg" alt="Loader front"/>
				<img className="back" src="/photo.stack.svg" alt="Loader back"/>
			</div>
		</div>
	);
}

export default ImageList;