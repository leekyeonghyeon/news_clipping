const fs = require('fs');
const path = require('path');
const BoannewsCrawler = require('./boannews-crawler');
const DailysecuCrawler = require('./dailysecu-crawler');
const NewsisCrawler = require('./newsis-crawler');
const MoneyTodayCrawler = require('./moneytoday-crawler');
const InewsCrawler = require('./inews-crawler');
const EtnewsCrawler = require('./etnews-crawler');
const template_object = require('./template-object');

async function result_crawler(outputhPath)
{
    const boannew_path = path.join(outputhPath, 'boannews.json');
    const dailysecu_path = path.join(outputhPath, 'dailysecu.json');
    const newsis_path = path.join(outputhPath, 'newsis.json');
    const moneytoday_path = path.join(outputhPath, 'moneytoday.json');
    const inews_path = path.join(outputhPath, 'inews.json');
    const etnews_path = path.join(outputhPath, 'etnews.json');

    const boannewsCrawler = new BoannewsCrawler();
    const dailysecuCrawler = new DailysecuCrawler();
    const newsisCrawler = new NewsisCrawler();
    const moneytodayCrawler = new MoneyTodayCrawler();
    const inewsCrawler = new InewsCrawler();
    const etnewsCrawler = new EtnewsCrawler();

    const newData = {
        boannewsstat : await boannewsCrawler.crawlStat(),
        dailysecustat : await dailysecuCrawler.crawlStat(),
        newsisstat : await newsisCrawler.crawlStat(),
        moneytodaystat : await moneytodayCrawler.crawlStat(),
        inewsstat : await inewsCrawler.crawlStat(),
        etnewsstat : await etnewsCrawler.crawlStat(),
    };

    let boannews_data = [];

    for(let i = 0; i < 20; ++i)
    {
        const Template_object = new template_object();
        Template_object.title = newData.boannewsstat.bytitle[i];
        Template_object.content = newData.boannewsstat.bycontent[i];
        Template_object.href = newData.boannewsstat.byhref[i];
        boannews_data.push(Template_object);
    }

    let dailysecu_data = [];

    for(let i = 0; i < 20; ++i)
    {
        const Template_object = new template_object();
        Template_object.title = newData.dailysecustat.bytitle[i];
        Template_object.content = newData.dailysecustat.bycontent[i];
        Template_object.href = newData.dailysecustat.byhref[i];
        dailysecu_data.push(Template_object);
    }

    let newsis_data = [];

    for(let i = 0; i < 20; ++i)
    {
        const Template_object = new template_object();
        Template_object.title = newData.newsisstat.bytitle[i];
        Template_object.content = newData.newsisstat.bycontent[i];
        Template_object.href = newData.newsisstat.byhref[i];
        newsis_data.push(Template_object);
    }

    let monytoday_data = [];

    for(let i = 0; i < 20; ++i)
    {
        const Template_object = new template_object();
        Template_object.title = newData.moneytodaystat.bytitle[i];
        Template_object.content = newData.moneytodaystat.bycontent[i];
        Template_object.href = newData.moneytodaystat.byhref[i];
        monytoday_data.push(Template_object);
    }

    let inews_data = [];

    for(let i = 0; i < 20; ++i)
    {
        const Template_object = new template_object();
        Template_object.title = newData.inewsstat.bytitle[i];
        Template_object.content = newData.inewsstat.bycontent[i];
        Template_object.href = newData.inewsstat.byhref[i];
        inews_data.push(Template_object);
    }

    let etnews_data = [];

    for(let i = 0; i < 15; ++i)
    {
        const Template_object = new template_object();
        Template_object.title = newData.etnewsstat.bytitle[i];
        Template_object.href = newData.etnewsstat.byhref[i];
        etnews_data.push(Template_object);
    }

    fs.writeFileSync(boannew_path, JSON.stringify(boannews_data));
    fs.writeFileSync(dailysecu_path, JSON.stringify(dailysecu_data));
    fs.writeFileSync(newsis_path, JSON.stringify(newsis_data));
    fs.writeFileSync(moneytoday_path, JSON.stringify(monytoday_data));
    fs.writeFileSync(inews_path, JSON.stringify(inews_data));
    fs.writeFileSync(etnews_path, JSON.stringify(etnews_data));

    console.log("json 생성 완료");
}

module.exports = {result_crawler};