{
  'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for( let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function() {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);
    titleList.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */
    let articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    let html = '';

    /* [DONE] for each article */
    //const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* [DONE] find the title element and
        get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] insert link into html variable */
      html = html + linkHTML;
      console.log('html:' + html);
    }

    titleList.innerHTML = html;


    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  };

  generateTitleLinks();

  const generateTags = function(){
    /* [DONE] find all articles */
    let articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles){

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log(tagsWrapper);

      /* [DONE] make html variable with empty string*/
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray){
        console.log(tag);

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;
        console.log('html:' + html);
      }

      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

    }

    /* END LOOP: for every article: */

  };

  generateTags();

}
