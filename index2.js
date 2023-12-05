const puppeteer = require('puppeteer');

let featureArticle;
const datas = [];

async function main () {
  const browser = await puppeteer.launch({ headless: false }) // chromium을 연다
  const page = await browser.newPage(); // 새페이지

  await page.goto("https://www.hankyung.com/", {}); // 한국경제 접속

  // 데이터 수집 코드

  await browser.close(); // 브라우저 닫기

  featureArticle = await page.$x('.//div[@class="main-top-major"]//ul//li'); // Error: Requesting main frame too early!

  // featureArticle 는 li 5개를 포함하고 있습니다.

  for (let i = 0; i < featureArticle.length; i++) {
    const data = {};

    data.text = await page.evaluate((el) => {
      const text = el.textContent;
      return text.replace(/(\t|\n|\s)+/g, ""); // html 코드를 그대로 가져오기 때문에 공백을 전부 제거합니다.
    }, featureArticle[i]);

    const link = await featureArticle[i].$("a"); // 각 li 안에 있는 a를 가져옵니다.

    data.link = await page.evaluate((el) => {
      return el.href; // 해당 태그의 속성도 가져올 수 있습니다.
    }, link);

    datas.push(data);
  }
}

main();
console.log(datas);