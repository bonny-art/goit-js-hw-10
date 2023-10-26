// import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// axios.defaults.headers.common['x-api-key'] = API_KEY;

// Make a request for a user with a given ID
// axios
//   .get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

const elem = {
  selector: document.querySelector('.breed-select'),
  card: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

elem.selector.classList.add('ss-hide');
elem.error.classList.add('js-hide');

// elem.selector.addEventListener(
//   'focus',
//   () => (elem.selector.selectedIndex = -1)
// );
elem.selector.addEventListener('change', handlerFindCat);

fetchBreeds()
  .then(data => {
    elem.selector.innerHTML =
      `<option data-placeholder="true"></option>` + createSelectMarkup(data);

    elem.loader.classList.add('js-hide');

    new SlimSelect({
      select: elem.selector,
      settings: {
        placeholderText: 'Select a breed of a cat',
      },
    });

    elem.selector.classList.toggle('ss-hide');
  })
  .catch(err => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    elem.loader.classList.toggle('js-hide');
    console.log(err);
  });

function createSelectMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function handlerFindCat(evt) {
  elem.loader.classList.toggle('js-hide');
  elem.card.classList.add('js-hide');
  const id = evt.currentTarget.value;

  fetchCatByBreed(id)
    .then(data => {
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      const markup = createCatMarkup(url, name, description, temperament);
      elem.card.innerHTML = markup;
      elem.loader.classList.toggle('js-hide');

      elem.card.classList.remove('js-hide');
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      elem.loader.classList.toggle('js-hide');

      console.log(err);
    });
}

function createCatMarkup(url, name, description, temperament) {
  return `
        <div class="img-container">
            <img class="img" src="${url}" />
        </div>
        <div class="cat-caption">
            <h1 class="cat-name" >${name}</h1>
            <p class="cat-descr">${description}</p>
            <p class="cat-temp">
                <span class="cat-accent">Temperament: </span>${temperament}
            </p>
        </div>
      `;
}
