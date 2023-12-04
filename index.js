// 'use strict';

/**
 * Amazonのほしい物リスト（公開）からASINを取得
 *
 */


const client = require('cheerio-httpcli');

var url = 'https://paiza.jp/works/mondai';

async function getData(url) {
  const result2 = [];
  const res = await client.fetch(url)
  if (res.response.statusCode === 200) {
    var $ = res.$; // function?
    const re = $('.m-mondai-set');
    console.log(re);
    /* $('.m-mondai-set .m-mondai-set__inner').each(function () {
      var element = $(this); // $ 자기 자신?
      // var href = element.attr('href');
      // var title = element.attr('title');
      // var array = href.match(/(\/dp\/+)(.{10})/);
      // var asin = array[2]; */
      
      // console.log(element)
      // result2.push(element);
    // })
  } else {
    console.log(res.response.statusCode);
    console.log("Failed to read page");
  }
  // console.log(result2); // ok
  return result2;
};

async function main() {
  const result2 = await getData(url); // Needs to use 'await' or handle the Promise it returns.
  console.log(result2);
}

main();