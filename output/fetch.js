const news_search = document.querySelector("[news_search]");

let boannews_value = [];
let dailysecu_value = [];
let newsis_value = [];
let money_today_value = [];
let inews_value = [];
let zdnet_value = [];
let etnews_value = [];

news_search.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    boannews_value.forEach(v =>{
        if(!v.title.includes(value) && !v.content.includes(value))
        {
            v.element.style.display = 'none'
        }else{
            v.element.style.display = ''
        }
    })

    dailysecu_value.forEach(v =>{
        if(!v.title.includes(value) && !v.content.includes(value))
        {
            v.element.style.display = 'none'
        }else{
            v.element.style.display = ''
        }
    })

    newsis_value.forEach(v =>{
        if(!v.title.includes(value) && !v.content.includes(value))
        {
            v.element.style.display = 'none'
        }else{
            v.element.style.display = ''
        }
    })

    money_today_value.forEach(v =>{
        if(!v.title.includes(value) && !v.content.includes(value))
        {
            v.element.style.display = 'none'
        }else{
            v.element.style.display = ''
        }
    })

    inews_value.forEach(v =>{
        if(!v.title.includes(value) && !v.content.includes(value))
        {
            v.element.style.display = 'none'
        }else{
            v.element.style.display = ''
        }
    })

    etnews_value.forEach(v =>{
        if(!v.title.includes(value))
        {
            v.element.style.display = 'none'
        }else{
            v.element.style.display = ''
        }
    })
})

fetch('./boannews.json')
.then(res => res.json())
.then(data => {
    //보안뉴스
    const boannew_url = 'https://www.boannews.com';

    boannews_value = data.map(news => {
        const article_template = document.querySelector("[mk_article_title_content_span]");
        const article_container = document.querySelector("[boan_article_container]");
        const article = article_template.content.cloneNode(true).children[0];
        const article_title = article.querySelector("[article_title_text]");
        const article_content = article.querySelector("[article_content_text]");
        const article_href = article.querySelector("[article_href]");
        article_title.textContent = news.title;
        article_content.textContent = news.content;
        article_href.href = boannew_url + news.href;
        article_container.append(article);
        return {title: news.title, content: news.content, element: article}
    })
});

fetch('./dailysecu.json')
.then(res => res.json())
.then(data =>{
    //데일리시큐
    const dailysecu_url = 'https://www.dailysecu.com'
    
    dailysecu_value = data.map(news => {
        const article_template = document.querySelector("[mk_article_title_content_span]");
        const article_container = document.querySelector("[dailysecu_article_container]");
        const article = article_template.content.cloneNode(true).children[0];
        const article_title = article.querySelector("[article_title_text]");
        const article_content = article.querySelector("[article_content_text]");
        const article_href = article.querySelector("[article_href]");
        article_title.textContent = news.title;
        article_content.textContent = news.content;
        article_href.href = dailysecu_url + news.href;
        article_container.append(article);
        return {title: news.title, content: news.content, element: article}
    })
});

fetch('./newsis.json')
.then(res => res.json())
.then(data =>{
    //뉴시스
    const newsis_url = 'https://newsis.com/'
    
    newsis_value = data.map(news => {
        const article_template = document.querySelector("[mk_article_title_content_span]");
        const article_container = document.querySelector("[newsis_article_container]");
        const article = article_template.content.cloneNode(true).children[0];
        const article_title = article.querySelector("[article_title_text]");
        const article_content = article.querySelector("[article_content_text]");
        const article_href = article.querySelector("[article_href]");
        article_title.textContent = news.title;
        article_content.textContent = news.content;
        article_href.href = newsis_url + news.href;
        article_container.append(article);
        return {title: news.title, content: news.content, element: article}
    })
});

fetch('./moneytoday.json')
.then(res => res.json())
.then(data =>{
    //머니투데이
    
    money_today_value = data.map(news => {
        const article_template = document.querySelector("[mk_article_title_content_span]");
        const article_container = document.querySelector("[money_today_article_container]");
        const article = article_template.content.cloneNode(true).children[0];
        const article_title = article.querySelector("[article_title_text]");
        const article_content = article.querySelector("[article_content_text]");
        const article_href = article.querySelector("[article_href]");
        article_title.textContent = news.title;
        article_content.textContent = news.content;
        article_href.href = news.href;
        article_container.append(article);
        return {title: news.title, content: news.content, element: article}
    })
});

fetch('./inews.json')
.then(res => res.json())
.then(data =>{
    //아이뉴스24
    const inews_url = 'https://www.inews24.com/'
    
    inews_value = data.map(news => {
        const article_template = document.querySelector("[mk_article_title_content_span]");
        const article_container = document.querySelector("[i_news_article_container]");
        const article = article_template.content.cloneNode(true).children[0];
        const article_title = article.querySelector("[article_title_text]");
        const article_content = article.querySelector("[article_content_text]");
        const article_href = article.querySelector("[article_href]");
        article_title.textContent = news.title;
        article_content.textContent = news.content;
        article_href.href = inews_url + news.href;
        article_container.append(article);
        return {title: news.title, content: news.content, element: article}
    })
});

fetch('./etnews.json')
.then(res => res.json())
.then(data =>{
    //전자신문
    const etnews_url = 'https://www.etnews.com/'
    
    etnews_value = data.map(news => {
        const article_template = document.querySelector("[mk_article_title_content_span]");
        const article_container = document.querySelector("[etnews_article_container]");
        const article = article_template.content.cloneNode(true).children[0];
        const article_title = article.querySelector("[article_title_text]");
        const article_href = article.querySelector("[article_href]");
        article_title.textContent = news.title;
        article_href.href = etnews_url + news.href;
        article_container.append(article);
        return {title: news.title, element: article}
    })
});