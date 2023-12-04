const axios = require('axios');
const cheerio = require('cheerio');

const parsing = async (url) => {
  const list = [];
  const html = await axios.get(url);
	const $ = cheerio.load(html.data);
  const $coursList = $('#main > div.p-works-mondai > section > div.m-mondai-sets');
	// const $coursList = $('#courses_section > div > div > div > main > div.courses_container > div > div'); // # is element id

	$coursList.each((idx, el) => {
		const chapter = $(el).find('h2').text();
    // const mondai = $(el).find('.m-mondai-sets__inner > li > div.m-mondai-set__inner').text(); // not work
		list.push({
			chapter,
      mondai,
 		});
	});

  return list;
};

async function main () {
  const result = await parsing('https://paiza.jp/works/mondai');
  console.log(result);
}

main();