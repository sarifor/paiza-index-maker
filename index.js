// 'use strict';

/**
 * Amazonのほしい物リスト（公開）からASINを取得
 *
 */


const client = require('cheerio-httpcli');

// var base = 'http://www.amazon.co.jp';
var url = 'http://www.amazon.co.jp/gp/registry/wishlist/3G4653SB32HMZ/';

async function getWishList(url) {
  const result2 = [];
  const res = await client.fetch(url)
  if (res.response.statusCode === 200) {
    var $ = res.$;
    $('.a-list-item .a-link-normal').each(function () {
      var element = $(this); // $ 자기 자신?
      var href = element.attr('href');
      var title = element.attr('title');
      // var array = href.match(/(\/dp\/+)(.{10})/);
      // var asin = array[2];
      result2.push({href, title});
    })
  } else {
    console.log(res.response.statusCode);
    console.log("Failed to read page");
  }
  // console.log(result2); // ok
  return result2;
};

const result2 = getWishList(url);
console.log(result2);