// @flow

import React, { Component } from 'react';
import axios from 'axios';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};
	}
	componentDidMount() {
		this.onLoad();
	}

	onLoad() {
		const url = `${process.env.API_URL}/get-default-message`;
		this.setState({ loaded: false });
		axios.get(url).then((response) => {
			this.setState({ message: response.data });
		});
	}

	render() {
		return <div>{this.state.message}</div>;
	}
}

export default Landing;
