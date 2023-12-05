/* 
  Backup for getting h2, not ul and li, using cheerio.
*/

const axios = require('axios');
const cheerio = require('cheerio');

const parsing = async (url) => {
  const list = [];
  const html = await axios.get(url);
	const $ = cheerio.load(html.data); // "cheerio에는 html 태그 데이터만 넣어야 함"
  
  // Mondai sets
  const $mondaiSets = $('#main > div.p-works-mondai > section > div.m-mondai-sets.js-learning_problem_category'); // 여러 개의 클래스

  // ul
  const $ul = $('#main > div.p-works-mondai > section > div.m-mondai-sets.js-learning_problem_category > ul');
  // console.log($ul); // Not working

  // li
  const $li = $ul.find('li');
  // console.log($li); // Not working

  // Chapter
  $mondaiSets.each(function() {
    const chapter = $(this).find('h2').text()
    list.push({
      chapter,
    })
  })

  return list;
};

async function main () {
  const result = await parsing('https://paiza.jp/works/mondai');
  console.log(result);
}

main();