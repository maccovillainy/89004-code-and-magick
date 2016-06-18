'use strict';

var reviewFilter = document.querySelector('.reviews-filter');
reviewFilter.classList.add('invisible');

var template = document.querySelector('template');
var reviewList = document.querySelector('.reviews-list');
var elementToClone;

var IMAGE_LOAD_TIMEOUT = 10000;
var REVIEWS_LOAD_URL = 'http://o0.github.io/assets/json/reviews.json';

if ('content' in template) {
  elementToClone = template.content.querySelector('.review');
} else {
  elementToClone = template.querySelector('.review');
}

/**
 * @param {Object} data
 * @param {HTMLElement} container
 * @return {HTMLElement}
 */
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

/** @param {function(Array.<Object>)} callback */
var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();
  var reviewsList = document.querySelector('.reviews');

  /** @param {ProgressEvent} evt */
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  /** @param {ProgressEvent}  */
  xhr.onerror = function() {
    reviewsList.classList.add('.reviews-load-failure');
  };

  /** @param {ProgressEvent} evt */
  xhr.onreadystatechange = function(evt) {
    if(xhr.readyState === 4) {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    } else {
      reviewsList.classList.add('.reviews-list-loading');
    }
  };

  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
};

/** @param {Array.<Object>} reviews */
var renderReviews = function(reviews) {
  reviews.forEach(function(data) {
    getElementsFromTemplate(data, reviewList);
    reviewFilter.classList.remove('invisible');
  });
};

getReviews(renderReviews);
