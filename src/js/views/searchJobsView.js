import {elements} from './base';
import {inpRand} from './cardsView';

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

export const getInput = () => {
	let jobLevelCheckbox = checkedCheckbox(elements.searchFormJobsCheckboxes);
	let companySizeCheckbox = checkedCheckbox(elements.searchFormCompaniesCheckboxes);
	let locationValue = elements.reactLocation.value;

	const query = `jobs?level=${jobLevelCheckbox}&company_size=${companySizeCheckbox}&location=${locationValue}&page=1`;

	return query;
};

export const clearResults = () => {
	elements.searchResList.innerHTML = '';
};

const renderJob = job => {
	const markup = `
		<div class="index-search__jobs-item">
			<span class="index-search__jobs-pin">SAVE</span>
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
	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (jobs, page = 1, resPerPage = 20) => {
	// render results of current page
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;

	jobs.forEach(renderJob);

	// render pagination buttons
	//renderButtons(page, jobs.length, resPerPgage);
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
		clearPutSelectionGroups(true);
	else if (tab === 'jobs')
		clearPutSelectionGroups(false);
	
}
/**********************End of the part where we react on tabs changing************************/