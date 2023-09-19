const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

class InewsCrawler{
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
        const url = 'http://www.inews24.com/list/020200';
        const res = await this.client.get(url);
        const decoding = iconv.decode(res.data, 'utf-8');
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

        for(let i = 0; i <= 21; i++)
        {
            let temp;
            if(!i) {temp = `body > main > article > header > div > a > h1`;}
            else{temp = `body > main > article > ol > li:nth-child(${i}) > div > a`;}
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
        for(let i = 0; i <= 21; i++)
        {
            let temp;
            if(!i) {temp = `body > main > article > header > div > p`;}
            else{temp = `body > main > article > ol > li:nth-child(${i}) > div > h2`;}
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
        for(let i = 0; i <= 21; i++)
        {
            let temp;
            if(!i) {temp = `body > main > article > header > div > a > h1`;}
            else{temp = `body > main > article > ol > li:nth-child(${i}) > div > a`;}
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

module.exports = InewsCrawler;