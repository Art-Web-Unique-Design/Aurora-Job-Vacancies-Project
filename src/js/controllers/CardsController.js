import infoSearch from '../models/searchModel';
import {elements} from '../views/base';
import * as cardsView from '../views/cardsView';

export const cardsController = async () => {
// Queries for companies and jobs
	const companyCardsQuery = 'companies?page=1';
	const jobCardsQuery = ['jobs?category=Data Science&page=1','jobs?category=Creative%20%26%20Design&page=1','jobs?category=Healthcare%20%26%20Medicine&page=1','jobs?category=Finance&page=1'];

// 1) New objects for these queries
	const companiesSearch = new infoSearch(companyCardsQuery);

// 2) Prepare UI for results
	cardsView.clearResults();
	try {
	// 3) Search for companies and jobs
		await companiesSearch.getResults();
		jobCardsQuery.forEach(async (cur, index) => {
			const jobsSearch = new infoSearch(cur);
			await jobsSearch.getResults();
			// 1 for jobsCards
			cardsView.renderResults(jobsSearch.result, 1, index + 1);
		});
		
	// 4) Render results on UI
	// 0 for companiesCards
		
		cardsView.renderResults(companiesSearch.result, 0);
		
	} catch (err) {
		alert(err + ' Something wrong with the cardsController Search...');
	}
}