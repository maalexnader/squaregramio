class LoadingState {
	constructor(state, value) {
		this.state = state;
		this.value = value;
	}

	static State = Object.freeze({
		LOADED: 1,
		LOADING: 2,
		ERROR: 3
	});
}

export default LoadingState;