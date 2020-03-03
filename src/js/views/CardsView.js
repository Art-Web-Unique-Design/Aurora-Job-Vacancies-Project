import {elements} from './base';

export const clearResults = () => {
	elements.cardsJobsCompanies.innerHTML = '';
};

export const limitCardContent = (content, limit = 220) => {
	//With const arrays we can not change value of array variables, but we can push into new variables, for objects too.
	const newcontent = [];
	if (content.length > limit){
		content.split(' ').reduce((acc, cur) => {
			if(acc + cur.length <= limit) {
				newcontent.push(cur);
			}
			// That's the way we update the accumulator for the next iteration in a reduce method.
			return acc + cur.length;
		}, 0);

		//return the result, join method is opposite for split, it will make from array a sentence with a ' ' wich we declared as an argument for join method.
		return `${newcontent.join(' ')} ...`;
	}
	return content;
}

export const limitWordLength = (word, limit) => {
	if (word.length > limit)
	{
		let length = 0;
		let newWord = [];
		while (length < limit) {
			newWord[length] = word[length];
			length++;
		}
		return newWord.join('');
	}
	return word;
}

// Take random number between a and b
export const inpRand = (a, b) => {
	let r = Math.floor(Math.random() * b + a);
	return r > 10 ? r = r - a : r = r;
}; 

const renderCard = (card, typeOfCard, img_num = 0) => {	
	if(typeOfCard)
	{
		const markup = `
		<div class="index-find__card card">
						<img src="./img/job_img-${img_num}.jpg" alt="----" class="index-find__card-img card__img">
						<a href="${card.refs.landing_page}">
							<div class="index-find__card-content card__content">
								<h4 class="index-find__card-heading card__heading heading-fourth">
									${card.company.name}
								</h4>
								<p class="index-find__card-text card__text">
									${limitCardContent(card.contents.replace(/<strong>|<em>|<\/strong>|<br>|<h[0-9]>|<li>/gi, ' '))}
								</p>
								<div class="index-find__card-publication card__publication">
									${card.publication_date.slice(0, 10).split('-').reverse().join('-')}
								</div>
								<p class="index-find__card-notes card__notes">
									<span class="index-find__notes-level card__notes-level">
										<span class="card__dark-select">Level:</span> ${limitWordLength(card.levels[0].short_name, 6)}
									</span> 
									<span class="card__notes-type">
										<span class="card__dark-select">Type:</span> ${limitWordLength(card.type, 8)}
									</span>
								</p>
							</div>
						</a>
					</div>
	`;
		elements.cardsJobs.insertAdjacentHTML('beforeend', markup);
	}
	else
	{
		const markup = `
		<div class="index-find__card card">
						<img src="${card.refs.logo_image}" alt="${card.model_type}" class="index-find__card-img card__img">
						<a href="${card.refs.jobs_page}">
							<div class="index-find__card-content card__content">
								<h4 class="index-find__card-heading card__heading heading-fourth">
									${card.name}
								</h4>
								<p class="index-find__card-text card__text">
									${card.description}
								</p>
								<div class="index-find__card-publication card__publication">
									${card.publication_date.slice(0, 10).split('-').reverse().join('-')}
								</div>
								<p class="index-find__card-notes card__notes">
									<span class="index-find__notes-level card__notes-level">
										<span class="card__dark-select">Size:</span> ${card.size.short_name}
									</span> 
									<span class="card__notes-type">
										<span class="card__dark-select">Type:</span> cmpny
									</span>
								</p>
							</div>
						</a>
					</div>
	`;
		elements.cardsCompanies.insertAdjacentHTML('beforeend', markup);
	}
}

export const renderResults = (cards, typeOfCard, img_num, page = 1) => {
	const startIndex = inpRand(0, 18);
	const startIndexCompanies = inpRand(0, 16);

	if(typeOfCard)
		cards.slice(startIndex, startIndex + 1).forEach((cur) => renderCard(cur, typeOfCard, img_num));
	else
		cards.slice(startIndexCompanies, startIndexCompanies + 3).forEach((cur) => renderCard(cur, typeOfCard))
}
