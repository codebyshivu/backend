const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://codebyshivu.github.io/backend/Song/chalisa/';

async function generateSongs() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const links = [];

    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.endsWith('.mp3')) { // Only include mp3 files
        links.push(url + href);
      }
    });

    const json = JSON.stringify(links, null, 2);
    fs.writeFileSync('songs.json', json, 'utf-8');
    console.log('songs.json created successfully!');
  } catch (error) {
    console.error('Error fetching links:', error);
  }
}

generateSongs();
