const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

class MoneyTodayCrawler{
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
        const url = 'http://news.mt.co.kr/newsList.html?pDepth1=tech&pDepth2=Ttotal';
        const res = await this.client.get(url);
        const decoding = iconv.decode(res.data, 'euc-kr');
        const $ = cheerio.load(decoding);

        return {
            bytitle: this._extractTitle($),
            bycontent: this._extractcontent($),
            byhref:this._extracthref($),
        };
    }

    _extractTitle($){
        let result = [];
        let titles = [];
        for(let i = 1; i <= 20; i++)
        {
            let temp = `#content > ul > li:nth-child(${i}) > div > strong > a`;
            titles.push(temp);
        }

        for(const value of titles)
        {
            let temp = $(value).text();
            result.push(temp);
        }

        return result;
    }
    _extractcontent($){
        let result = [];
        let content = [];
        for(let i = 1; i <= 20; i++)
        {
            let temp = `#content > ul > li:nth-child(${i}) > div > p > a`;
            content.push(temp);
        }

        for(const value of content)
        {
            let temp = $(value).text();
            result.push(temp);
        }

        return result;
    }
    _extracthref($){
        let result = [];
        let _href = [];
        for(let i = 1; i <= 20; i++)
        {
            let temp = `#content > ul > li:nth-child(${i}) > div > strong > a`;
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

module.exports = MoneyTodayCrawler;