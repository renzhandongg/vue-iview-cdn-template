const request = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs-extra')

let url = 'https://www.plmm.com.cn/xinggan/4358.html'

const getUrl = async function () {
    const res = await request.get(url);
    const $ = cheerio.load(res.text);
    $('#grid').each(function () {
        const href = $(this).find('a').attr('href');
        const title = $(this).find('img').attr('alt');
        console.log(title, href);
    })
}

getUrl();