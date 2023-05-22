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
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 4,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors.list';

  const generateTitleLinks = function(customSelector = ''){
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);
    titleList.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(articles);
    console.log(customSelector);
    console.log(optArticleSelector + customSelector);

    let html = '';

    /* [DONE] for each article */
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

  /* NEW */
  const calculateTagsParams = function (tags){
    const params = {'max': 0, 'min': 999999};

    for (let tag in tags){
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
      console.log(tag + ' is used ' + tags[tag] + ' times');
    }
    return params;
  };


  /* NEW */
  const calculateTagClass = function(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    //classNumber = Math.floor(((count - params.min) / (params.max- params.min)) * optCloudClassCount + 1);

    return optCloudClassPrefix + classNumber;
  };


  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

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

        /* [DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(linkHTML);

        /* [DONE] add generated code to html variable */
        html = html + linkHTML;
        console.log('html:' + html);

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {

          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      }
      /* [DONE] END LOOP: for each tag */

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

    }
    /* [DONE] END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /*[NEW] make na new constant "tagsParams" from function calculateTagsParams */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams: ', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML ='';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags){

      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
      console.log('tagLinkHTML: ', tagLinkHTML);

      allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + tagLinkHTML + '">' + tag + '</a></li>';
      console.log(allTagsHTML);
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

  };

  generateTags();

  const tagClickHandler = function (event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Tag was clicked');

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-','');
    console.log(tag);

    /* [TO BE CHECKED] find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTags);

    /* [DONE] START LOOP: for each active tag link */
    for (let activeTag of activeTags){

      /* [DONE] remove class active */
      activeTag.classList.remove('active');

    }
    /* [DONE] END LOOP: for each active tag link */

    /* [TO BE CHECKED] find all tag links with "href" attribute equal to the "href" constant */
    const targetTags = document.querySelectorAll('a[href="' + href + '"]');
    console.log(targetTags);

    /* [DONE] START LOOP: for each found tag link */
    for (let targetTag of targetTags){

      /* [DONE] add class active */
      targetTag.classList.add('active');
    }
    /* [DONE] END LOOP: for each found tag link */

    /* [TO BE CHECKED] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  const addClickListenersToTags = function(){

    /* [DONE] find all links to tags */
    const links = document.querySelectorAll('.list-tags a');
    console.log(links);

    /* [DONE] START LOOP: for each link */
    for (let link of links){

      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

    }
    /* [DONE] END LOOP: for each link */
  };

  addClickListenersToTags();

  const generateAuthors = function(){
    /* [NEW] create a new variable allAuthors with an empty array */
    let allAuthors = [];

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles){

      /* [DONE] find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log(authorWrapper);

      /* [DONE] make hmtl variable with empty string */
      let html = '';

      /* [DONE] get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);

      /* [DONE] generate HTLM of the link */
      const linkHTML ='<a href="' + articleAuthor + '">' + articleAuthor + '</a>';
      console.log(linkHTML);

      /* [DONE] add generated code to html variable */
      html = html +  linkHTML;

      /* [NEW] check if this link is NOT already in allAuthors */
      if(allAuthors.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allAuthors array */
        allAuthors.push(linkHTML);
      }

      /* [DONE] insert HTML of link into the author wrapper */
      authorWrapper.innerHTML = html;

    }
    /* [DONE] END LOOP: for every article: */

    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(optAuthorsListSelector);

    /* [NEW] add html from allAuthors to authorList*/
    authorList.innerHTML = allAuthors.join(' ');
  };

  generateAuthors();

  const authorClickHandler = function(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Author was clicked');

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* [DONE] make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('by ','');
    console.log(author);

    /* [DONE] find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="by "]');
    console.log(activeAuthors);

    /* [DONE] START LOOP: for each active author link */
    for (let activeAuthor of activeAuthors){

      /* [DONE] remove class active */
      activeAuthor.classList.remove('active');

    }
    /* [DONE] END LOOP: for each active author link */

    /* [DONE] find all author links with "href" attribute equal to the "href" constant */
    const targetAuthors = document.querySelectorAll('a[href="' + href + '"]');
    console.log(targetAuthors);

    /* [DONE] START LOOP: for each found author link */
    for (let targetAuthor of targetAuthors){

      /* [DONE] add class active */
      targetAuthor.classList.add('active');

    }
    /* [DONE] END LOOP: for each found author link */

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + href + '"]');
    console.log('[data-author="' + href + '"]');
  };

  const addClickListenersToAuthors = function(){
    /* [DONE] find all links to authors */
    const links = document.querySelectorAll('.post-author a');

    /* [DONE] START LOOP: for each link */
    for (let link of links){
      /* [DONE] add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    }
    /* [DONE] END LOOP: for each link */
  };

  addClickListenersToAuthors();

}
