import '../sass/main.scss';
import { elements } from './views/base';
import { autocomplete } from './autocomplete/Autocomplete';

import { cardsController } from './controllers/cardsController';
import { searchController } from './controllers/searchController';

/***** LOCATION AUTOCOMPLETE ********************************/
autocomplete(document.getElementById('location_select'));
autocomplete(document.getElementById('reaction-location_select'));
/*****-----------------------********************************/

cardsController();

elements.searchForm.addEventListener('submit', e => {
	// Here we prevent reloading of the page
	e.preventDefault();
	searchController();
});