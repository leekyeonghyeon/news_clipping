const path = require('path');
const fs = require('fs');
const {result_crawler} = require('./crawler-summary');

async function main(){
    const outputhPath = path.join(process.cwd(), 'output');

    if(!fs.existsSync(outputhPath)){
        fs.mkdirSync(outputhPath);
    }

    try{
        console.log('크롤링 시작');
        await result_crawler(outputhPath);
    }catch(e){
        console.error('에러', e);
    }
}

main();