import {elements} from './base';
import {inpRand} from './cardsView';

// Flag to find out what query should be built for companies(true) or jobs(false) 
let activeTabFlag = false;

const checkedCheckbox = checkboxes => {
	for(let i = 0; i < checkboxes.length; i++)
	{
        if (checkboxes[i].checked == true) {
			console.log(checkboxes[i].value);
			return checkboxes[i].value;
        }
	}
	
};

/***************** If start button was clicked in index-hero section. ***********************/
const compareAndPutCheckboxes = (checkboxes, checkedCheckboxValue) => {
	checkboxes.forEach(cur => {
		if (cur.value == checkedCheckboxValue)
			cur.checked = true;
	})
}

export const putHeroInputs = () => {
	compareAndPutCheckboxes(elements.searchFormJobsCheckboxes,checkedCheckbox(elements.indexHeroFormJobsCheckboxes));
	compareAndPutCheckboxes(elements.searchFormCompaniesCheckboxes,checkedCheckbox(elements.indexHeroFormCompaniesCheckboxes));
	elements.reactLocation.value = elements.indexHeroLocation.value;

}
/************* END If start button was clicked in index-hero section. *******************/

export const getInput = (page = 1) => {
	let locationValue = elements.reactLocation.value;
	// if companies is searched then first brench else another
	if(activeTabFlag) 
	{
		let locationValue = elements.reactLocation.value;

		const query = `companies?location=${locationValue}&page=${page}`;

		return query;
	} else 
	{
		let jobLevelCheckbox = checkedCheckbox(elements.searchFormJobsCheckboxes);
		let companySizeCheckbox = checkedCheckbox(elements.searchFormCompaniesCheckboxes);

		const query = `jobs?level=${jobLevelCheckbox}&company_size=${companySizeCheckbox}&location=${locationValue}&page=${page}`;

		return query;
	}
};

export const clearResults = () => {
	elements.searchJobsResList.innerHTML = '';
	elements.searchCompaniesResList.innerHTML = '';
	elements.searchPaginationContainer.innerHTML = '';
};

const renderJob = job => {
	const markup = `
		<div class="index-search__jobs-item">
			<span class="index-search__jobs-pin">
				SAVE
				<svg class="index-search__jobs-icon">
                        <use xlink:href="img/symbol-defs.svg#icon-pin"></use>
                 </svg>
			</span>
			<div class="index-search__jobs-description">
				<h4 class="heading-fourth index-search__company-name">${job.company.name}</h4>
				<p class="index-search__jobs-name">${job.name}</p>
			</div>
			
			<div class="index-search__jobs-location">
				<h4 class="heading-fourth index-search__location-note">This job is in</h4>
				<p class="index-search__location">${job.locations[inpRand(0, job.locations.length)].name}</p>
			</div>
			<a href="${job.refs.landing_page}" class="btn-text btn-text--second">View Full Posting</a>
		</div>
	`;
	elements.searchJobsResList.insertAdjacentHTML('beforeend', markup);
};

const renderCompany = company => {
	const markup = `
		<div class="index-search__companies-item">
			<img class="index-search__companies-img" src="${company.refs.f2_image}" alt="Company">
			<div class="index-search__companies-content">
				<h4 class="heading-fourth index-search__companies-name">${company.name}</h4>
				<p class="index-search__companies-description">
					${company.description}
				</p>
				<a href="${company.refs.landing_page}" class="btn-text btn-text--second">View Company Page</a>
			</div>
		</div>
	`;
	elements.searchCompaniesResList.insertAdjacentHTML('beforeend', markup);
};

/******************************Render Buttons****************************/
const createButton = (page, type) => type === 'prev' ? `<button class="btn-inline index-search__btn--prev" data-goto=${page - 1}>
			<img class="index-search__icon index-search__icon--left" src="img/arrow-right-red.png" alt="Arrow">
			<span>Prev</span>
	    </button>
	` : `<button class="btn-inline index-search__btn--next" data-goto=${page + 1}>
			<span>Next</span>
			<img class="index-search__icon" src="img/arrow-right-red.png" alt="Arrow">
	    </button>
	`;

const createSimpleButton = (page, activePage) => page == activePage ? `<button class="btn-inline index-search__btn btn-inline--active" data-goto=${page}>${page}</button>` : `<button class="btn-inline index-search__btn" data-goto=${page}>${page}</button>`;

const createBlockButtons = (pages, activePage) => {
	let buttons = '';

	for (let i = 1; i <= pages; i++)
		buttons += createSimpleButton(i, activePage);
	return `
	<div class="index-search__content-nums">
		${buttons}
	</div>
	`
};

const renderButtons = (page, pages) => {
	let button;
	if (page === 1 && pages > 1) {
		// Only button to go to next page
		button = `
			${createBlockButtons(pages, page)}
			${createButton(page, 'next')}
		`
	} else if (page < pages) {
		// Both buttons
		button = `
			${createButton(page, 'prev')}
			${createBlockButtons(pages, page)}
			${createButton(page, 'next')}
		`;
	} else if (page === pages && pages > 1) {
		// Only button to go to previous page
		button = `
		${createButton(page, 'prev')}
		${createBlockButtons(pages, page)}
		`;

	};

	elements.searchPaginationContainer.insertAdjacentHTML('afterbegin', button);
}
/*************************END of Rendering Buttons***********************/

export const renderResults = (result, page = 1, resultsNum = 1) => {
	// render results of current page

	if (activeTabFlag) 
		result.forEach(renderCompany)
	else
		result.forEach(renderJob);

	// render pagination buttons
	console.log(page + ' - ' + resultsNum);
	if(resultsNum >= page && resultsNum > 1)
	renderButtons(page, resultsNum);
};

/**********************Part where we react on tabs changing************************/
const clearPutSelectionGroups = (flag) => {
	if (flag)
		elements.formSelectionGroups.forEach(cur => {
			cur.style.display = "none";
		});
	else
		elements.formSelectionGroups.forEach(cur => {
			cur.style.display = "grid";
		});
}

//IF we put true flag we clear else we put selection groups
export const renderForm = tab => {
	if (tab === 'companies')
	{
		activeTabFlag = true;
		clearPutSelectionGroups(true);
	}
	else if (tab === 'jobs')
	{
		activeTabFlag = false;
		clearPutSelectionGroups(false);
	}
}
/**********************End of the part where we react on tabs changing************************/