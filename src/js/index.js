import '../sass/main.scss';
import { elements } from './views/base';
import { autocomplete } from './autocomplete/Autocomplete';

import { cardsController } from './controllers/cardsController';
import  { searchController } from './controllers/searchController';
import { toggleTab } from './controllers/searchController';


/***** LOCATION AUTOCOMPLETE ********************************/
autocomplete(document.getElementById('location_select'));
autocomplete(document.getElementById('reaction-location_select'));
/*****-----------------------********************************/

//cardsController();

elements.searchForm.addEventListener('submit', e => {
	// Here we prevent reloading of the page
	e.preventDefault();
	searchController();
});

// Method to toggle Active tab
elements.searchTabsContainer.addEventListener('click', e => {
		const notActiveTab = e.target.closest('.index-search__tab');
		toggleTab(notActiveTab);
});

console.log(elements.indexHeroStartButton);

elements.indexHeroStartButton.addEventListener('click', e => {
	e.preventDefault();
	searchController(true);
	elements.indexSearch.classList.toggle('index-search--reaction');
});

elements.indexSearchClose.addEventListener('click', () => {
	elements.indexSearch.classList.toggle('index-search--reaction');
});