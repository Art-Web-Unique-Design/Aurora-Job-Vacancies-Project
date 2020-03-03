import infoSearch from '../models/searchModel';
import {elements} from '../views/base';
import * as searchView from '../views/searchJobsView';

export const searchController = async () => {
	// 1) Get query from view
	let query = searchView.getInput();

	if (query) {
		// 2) New search object
		const search = new infoSearch(query);

		// 3) Prepare UI for results
		searchView.clearResults();

		try {
			// 4) Search for jobs
			await search.getResults();
			await search.checkSize();

			// 5) Render results on UI
			searchView.renderResults(search.result);
		} catch (err) {
			alert(err + 'Something wrong with the controlSearch...');
		}
	}
};

// Here we check that not active button was clicked and change active tab, then render reaction-Form
export const toggleTab = notActiveTab => {
	if(notActiveTab && !(notActiveTab.classList.contains('index-search__tab--active')))
	{
		/*elements.searchActiveTab.classList.toggle('index-search__tab--active');
		notActiveTab.classList.toggle('index-search__tab--active');*/ // What's the difference here???
		console.log(elements.searchActiveTab.innerHTML.textContent);
		elements.searchTabs.forEach(cur => {
			cur.classList.toggle('index-search__tab--active');
		});
		
		//console.log('CHECKING');
	}
}