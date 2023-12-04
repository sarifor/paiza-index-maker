// 'use strict';

/**
 * Amazonのほしい物リスト（公開）からASINを取得
 *
 */


const client = require('cheerio-httpcli');

// var base = 'http://www.amazon.co.jp';
var url = 'http://www.amazon.co.jp/gp/registry/wishlist/3G4653SB32HMZ/';

async function getWishList(url) {
  // const result2 = [];
  const res = await client.fetch(url)
  const contents = res.$('.a-list-item .a-link-normal'); // 
  console.log(contents);
  if (res.response.statusCode === 200) {
    // console.log(res);
    // const contents = res.$('a > h3');
    // console.log(contents);

    var $ = res.$;
    $('h5 .a-link-normal').each(function () {
      var element = $(this);
      var href = element.attr('href');
      var title = element.attr('title');
      console.log(element, href, title);
    })

  } else {
    console.log(res.response.statusCode);
    console.log("Failed to read page");
  }

  /*  var $ = result.$;
    $('h5 .a-link-normal').each(function () {
      var element = $(this);
      var href = element.attr('href');
      var title = element.attr('title');
      var array = href.match(/(\/dp\/+)(.{10})/);
      var asin = array[2];
      if (asin) console.log(asin);

      console.log(title)

      result2.push({
        href,
        title,
        array,
        asin,
      })
    });
    // var next = hasNextPage($);
    // if (next)  getWishList(base+next); // 재귀함수
  })
  console.log("test");
  return result2;
  */
};

/* function hasNextPage($){
  //console.log($('div[id=wishlistPagination] .a-last a').attr('href'));
  return $('div[id=wishlistPagination] .a-last a').attr('href');
}; */
const result2 = getWishList(url);
console.log(result2);