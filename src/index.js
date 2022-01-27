import './css/styles.css';
import debounce from 'lodash.debounce';
import countryTpl from '../src/templates/country.hbs';
import countriesTpl from '../src/templates/country-cards.hbs';
import Notiflix from 'notiflix';
import API from './fetchCountriesByName';
import getRefs from './get-refs';

const refs = getRefs();

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onSearchInput,DEBOUNCE_DELAY));

function onSearchInput (e) {
    e.preventDefault();

   let query = e.target.value.trim().toLowerCase();
   API.fetchCountriesByName(query)
        .then(createCountryCards)
        .catch(onfetchError)
        // .finally(() => {refs.searchBox.value="";})

    if (!query) {
        refs.countryContainer.textContent='';
        refs.listCountry.textContent='';
    }
}

function createCountryCards (country) {
    console.log(country);
    
    refs.countryContainer.textContent='';
    refs.listCountry.textContent='';

    if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
    }

    if (country.length > 2 && country.length <10) {
        const markupList = countriesTpl(country);
        refs.listCountry.innerHTML = markupList;
    }

    if (country.length === 1) {
        const markup = countryTpl(country);
        refs.countryContainer.innerHTML = markup;
    }
    
}


function onfetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}
  



