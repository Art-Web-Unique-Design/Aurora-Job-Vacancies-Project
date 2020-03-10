import axios from 'axios';

export default class infoSearch {
	constructor(query) {
		this.query = query;
	}

	//Async method
	async getResults(query) {
		try{
			console.log(this.query);
			const res = await axios(`https://www.themuse.com/api/public/${this.query}`);
			this.result = res.data.results;
			console.log(this.result.length);
			console.log(this.result);
		} catch (error) {
			alert(error);
		}
	}

// Method where we can calculate number of pages that will be returned with server
	async checkSize(query) {
		this.i = 2;
		let res_check = await axios(`https://www.themuse.com/api/public/${this.query}`);
		while(res_check.data.results.length != 0 && this.i < 21)
		{
			res_check = await axios(`https://www.themuse.com/api/public/${this.query.replace(/[1-9]+$/gi, this.i)}`);
			console.log(res_check.data.results);
			console.log(this.i);
			this.i++;
		}
		this.i--;
	}
}