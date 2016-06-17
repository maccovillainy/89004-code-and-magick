'use strict';

function hiddenReviews() {
  var reviewFilter = document.querySelector('.reviews-filter');

  reviewFilter.classList.add('invisible');
}

hiddenReviews();

var template = document.querySelector('template');
var reviewList = document.querySelector('.reviews-list');
var elementToClone;

if ('content' in template) {
  elementToClone = template.content.querySelector('.review');
} else {
  elementToClone = template.querySelector('.review');
}

var IMAGE_LOAD_TIMEOUT = 10000;

var getElementsFromTemplate = function(data, container) {

  var element = elementToClone.cloneNode(true);
  var reviewAuthor = element.querySelector('.review-author');

  element.querySelector('.review-rating').textContent = data.rating;
  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);

  var backgroundImage = new Image();
  var backgroundLoadTimeout;

  backgroundImage.onload = function() {
    reviewAuthor.src = backgroundImage.src;
    reviewAuthor.width = 124;
    reviewAuthor.height = 124;
    reviewAuthor.alt = data.author.name;
    reviewAuthor.title = data.author.name;
    console.log(data.author.picture);
    clearTimeout(backgroundLoadTimeout);
  };

  backgroundImage.onerror = function() {
    element.classList.add('review-load-failure');
  };

  backgroundImage.src = data.author.picture;

  backgroundLoadTimeout = setTimeout(function() {
    backgroundImage.src = '';
    element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return element;
};

window.reviews.forEach(function(data) {
  getElementsFromTemplate(data, reviewList);

});
