const axios = require('axios');
const cheerio = require('cheerio');

const parsing = async (url) => {
  const list = [];
  const html = await axios.get(url);
	const $ = cheerio.load(html.data);
	const $coursList = $('#courses_section > div > div > div > main > div.courses_container > div > div'); // # is element id

	$coursList.each((idx, el) => {
		const title = $(el).find('.course_title').eq(0).text(); // 동명의 클래스 엘러먼트
		const instructor = $(el).find('.instructor').text();
		const img = $(el).find('.card-image > figure > img').attr('src');

		list.push({
			title,
			instructor,
 			img
		});
    console.log(list);		
	});
}

parsing('https://www.inflearn.com/courses?s=%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8');