import axios from 'axios';

export default class infoSearch {
	constructor(query, i = 0) {
		this.query = query;
		this.i = i;
	}

	//Async method
	async getResults(query) {
		try{
			//console.log(this.query);
			const res = await axios(`https://www.themuse.com/api/public/${this.query}`);
			this.result = res.data.results;
			/*console.log(this.result.length);
			console.log(this.result);*/
		} catch (error) {
			alert(error);
		}
	}

// Method where we can calculate number of pages that will be returned with server
	async checkSize(query) {
		if (this.i === 1) {
			let res_check = await axios(`https://www.themuse.com/api/public/${this.query.replace(/[1-9]+$/gi, this.i)}`);
			while(res_check.data.results.length != 0 && this.i < 9)
			{
				res_check = await axios(`https://www.themuse.com/api/public/${this.query.replace(/[1-9]+$/gi, this.i)}`);
				/*console.log(res_check.data.results);
				console.log(this.i);*/
				this.i++;
			}
			this.i = this.i - 2;
			this.resNumPages = this.i;
		}

	}
}