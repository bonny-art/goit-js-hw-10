import axios from 'axios';

const MAIN_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_ANXFBEcIM0yKus5fb58clof0MJOs4zLea5inllroiU2Lrmx56ZK8Y8l86jVTvJjp';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  //   return fetch(`${MAIN_URL}/breeds`).then(resp => {
  //     if (!resp.ok) {
  //       throw new Error(resp.statusText || 'Some error happend');
  //     }
  //     return resp.json();

  // });

  return axios.get(`${MAIN_URL}/breeds`);
}

function fetchCatByBreed(breedId) {
  //   const Params = new URLSearchParams({
  //     breed_ids: breedId,
  //   });

  //   const options = {
  //     headers: {
  //       'x-api-key': API_KEY,
  //     },
  //   };

  //   return fetch(`${MAIN_URL}/images/search?${Params}`, options).then(resp => {
  //     if (!resp.ok) {
  //       throw new Error(resp.statusText || 'Some error happend');
  //     }
  //     return resp.json();
  //   });

  return axios.get(`${MAIN_URL}/images/search`, {
    params: {
      breed_ids: breedId,
    },
  });
}

export { fetchBreeds, fetchCatByBreed };
