import infoSearch from '../models/searchModel';
import { elements, renderLoader, clearLoader } from '../views/base';
import * as searchView from '../views/searchJobsCompaniesView';

// Variable to detect numbers of page after first load of result
let searchResNumPages = 1;

export const searchController = async (flag = false, page = 1, findPagesFlag = 0) => {
	// 0) Check if the start button is clicked in the index-hero section
	if (flag)
		searchView.putHeroInputs();

	// 1) Get and build query from view it depends on companies or jobs we search for
	let query = searchView.getInput(page);
	console.log(query);

	if (query) {
		// 2) New search object
		const search = new infoSearch(query, findPagesFlag);

		// 3) Prepare UI for results
		searchView.clearResults();
		renderLoader(elements.searchContentWindow);
		try {
			// 4) Search for jobs
			await search.getResults();
			await search.checkSize();

			// 5) Render results on UI
			clearLoader();
			if (findPagesFlag)
				searchResNumPages = search.resNumPages;
			searchView.renderResults(search.result, page, searchResNumPages);
			console.log('ResNumPages: '+searchResNumPages)
		} catch (err) {
			alert(err + 'Something wrong with the controlSearch...');
			clearLoader()
		}
	}
};

// Here we check that not active button was clicked and change active tab, then render reaction-Form
export const toggleTab = notActiveTab => {
	if(notActiveTab && !(notActiveTab.classList.contains('index-search__tab--active')))
	{
		/*elements.searchActiveTab.classList.toggle('index-search__tab--active');
		notActiveTab.classList.toggle('index-search__tab--active');*/ // What's the difference here???
		elements.searchTabs.forEach(cur => {
			if(cur.classList.toggle('index-search__tab--active'))
				searchView.renderForm(cur.innerHTML);
		});
		
		//console.log('CHECKING');
		return true;
	}
	return 0;
}
