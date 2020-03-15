import { elements } from './views/base';
import { autocomplete } from './autocomplete/Autocomplete';

import * as searchView from './views/searchJobsCompaniesView';

import { cardsController } from './controllers/cardsController';
import  { searchController } from './controllers/searchController';
import { toggleTab } from './controllers/searchController';


/***** LOCATION AUTOCOMPLETE ********************************/
autocomplete(document.getElementById('location_select'));
autocomplete(document.getElementById('reaction-location_select'));
/*****-----------------------********************************/

// Controller which displays cards in the main section
cardsController();

elements.searchForm.addEventListener('submit', e => {
	// Here we prevent reloading of the page
	e.preventDefault();
	searchController(false, 1, 1);
});

// Method to toggle Active tab
elements.searchTabsContainer.addEventListener('click', e => {
		const notActiveTab = e.target.closest('.index-search__tab');
		if(toggleTab(notActiveTab))
			searchController(false, 1, 1);
});

// Reaction on click on the start button in the index-hero section
elements.indexHeroStartButton.addEventListener('click', e => {
	e.preventDefault();
	searchController(true, 1, 1);
	elements.indexSearch.classList.toggle('index-search--reaction');
});

// Closing the search Form
elements.indexSearchClose.addEventListener('click', () => {
	elements.indexSearch.classList.toggle('index-search--reaction');
});

// Reaction form visibility
elements.searchHeadingCog.addEventListener('click', () => {
	elements.searchForm.style.display = 'inline-block';
});

elements.searchHeadingFormClose.addEventListener('click', () => {
	elements.searchForm.style.display = 'none';
	searchController(true, 1, 1);
});

// PAGINATION ALGORYTHM
elements.searchPaginationContainer.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	//console.log(btn);
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		//console.log('GOTOPAGE= ' + goToPage)
		searchView.clearResults();
		searchController(false, goToPage);
	}
});

///////////////////////////////////////  QUESTION!!! HOW TO STOP FUNCTION FROM ANOTHER FUNCTION PROBLEM HERE IN searchHeadingFormClose:document.querySelector('.form__heading-close'), LOOK IN searchController!!!!  ////////////////////////////////////////