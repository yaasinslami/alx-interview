#!/usr/bin/node
const util = require('util');
const request = util.promisify(require('request'));

const filmID = process.argv[2];

async function starwarsCharacters(filmId) {
  try {
    const endpoint = `https://swapi-api.hbtn.io/api/films/${filmId}`;
    const response = await request(endpoint);
    const film = JSON.parse(response.body);

    const characterPromises = film.characters.map(async (url) => {
      const charResponse = await request(url);
      const character = JSON.parse(charResponse.body);
      return character.name;
    });

    const characters = await Promise.all(characterPromises);
    characters.forEach((name) => console.log(name));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

starwarsCharacters(filmID);
