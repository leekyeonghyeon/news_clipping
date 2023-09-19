const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

class etnewsCrawler{
    constructor(){
        this.client = axios.create({
            header:{
                'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.199 Safari/537.36',
            },
            method: 'GET',
            responseType: 'arraybuffer',
        });
    }

    async crawlStat(){
        const url = 'http://www.etnews.com/news/section.html?id1=04&id2=045';
        const res = await this.client.get(url);
        const decoding = iconv.decode(res.data, 'utf-8');
        const $ = cheerio.load(decoding);

        return {
            bytitle: this._extractTitle($),
            byhref:this._extracthref($),
        };
    }

    _extractTitle($){
        let result = [];
        let titles = [];
        for(let i = 1; i <= 15; i++)
        {
            let temp = `body > section > section > section > section > article:nth-child(${i}) > p > a`;
            titles.push(temp);
        }

        for(const value of titles)
        {
            let temp = $(value).text();
            result.push(temp);
        }

        return result;
    }

    _extracthref($){
        let result = [];
        let _href = [];
        for(let i = 1; i <= 15; i++)
        {
            let temp = `body > section > section > section > section > article:nth-child(${i}) > p > a`;
            _href.push(temp);
        }

        for(const value of _href)
        {
            let temp = $(value).attr('href');
            result.push(temp);
        }

        return result;
    }
}

module.exports = etnewsCrawler;