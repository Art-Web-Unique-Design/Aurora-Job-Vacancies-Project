export const elements = {
	cardsJobsCompanies:document.querySelectorAll('.index-find__cards'),
	cardsJobs:document.querySelector('.cards-jobs'),
	cardsCompanies:document.querySelector('.cards-companies'),
	indexSearch:document.querySelector('.index-search'),
	indexSearchClose:document.querySelector('.index-search__top-close'),
	reactLocation:document.querySelector('#reaction-location_select'),
	indexHeroLocation:document.querySelector('#location_select'),
	searchForm:document.querySelector('#reaction-form'),
	searchJobsResList:document.querySelector('.index-search__jobs'),
	searchCompaniesResList:document.querySelector('.index-search__companies'),
	searchTabsContainer:document.querySelector('.index-search__tabs'),
	searchActiveTab:document.querySelector('.index-search__tab--active'),
	searchTabs:document.querySelectorAll('.index-search__tab'),
	searchContentWindow:document.querySelector('.index-search__content'),
	searchPaginationContainer:document.querySelector('.index-search__content-pages'),
	formSelectionGroups:document.querySelectorAll('#reaction-form .form__selection-group'),
	searchFormJobsCheckboxes:document.querySelectorAll('#reaction-form .form__selection-group input[name="job_level"]'),
	searchFormCompaniesCheckboxes:document.querySelectorAll('#reaction-form .form__selection-group input[name="company_size"]'),
	indexHeroStartButton:document.querySelector('.index-hero__form-btn'),
	indexHeroFormCheckboxes:document.querySelectorAll('.index-hero form .form__selection-group input'),
	indexHeroFormJobsCheckboxes:document.querySelectorAll('.index-hero .form__selection-group input[name="job_level"]'),
	indexHeroFormCompaniesCheckboxes:document.querySelectorAll('.index-hero .form__selection-group input[name="company_size"]'),
}
/*<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>*/
export const elementStrings = {
	loader: 'loader__lds-roller'
};

export const renderLoader = parent => {
	const loader = `
		<div class="loader__lds-roller lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
	`;
	parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if (loader) loader.parentElement.removeChild(loader);
}