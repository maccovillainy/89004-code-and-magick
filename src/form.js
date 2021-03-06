'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var form = document.querySelector('.review-form');
  var reviewField = document.querySelector('.review-fields');
  var reviewFieldText = document.querySelector('.review-fields-text');
  var reviewFieldName = document.querySelector('.review-fields-name');

  var reviewName = document.querySelector('#review-name');
  var reviewText = document.querySelector('#review-text');
  var reviewButton = document.querySelector('.review-submit');
  var ratingForm = document.querySelector('.review-form-group-mark');
  var ratingItem = form.elements['review-mark'];
  var MIN_RATING = 3;
  var isLowRating;

  var browserCookies = require('browser-cookies');

  reviewButton.disabled = true;

  var checkRating = function() {

    if (ratingItem.value <= MIN_RATING) {
      isLowRating = true;
      reviewField.required = true;

    } else {
      isLowRating = false;
      reviewFieldName.required = true;
      reviewFieldText.required = false;
    }
  };

  var checkField = function(field) {
    return field.value !== '';
  };

  ratingForm.onchange = function(evt) {
    evt.preventDefault();
    checkRating();

    reviewFieldText.classList.toggle('invisible', !isLowRating);
  };

  form.oninput = function() {
    checkRating();

    if (isLowRating) {

      reviewFieldName.classList.toggle('invisible', false);
      reviewFieldText.classList.toggle('invisible', false);

      if (!(checkField(reviewName)) && !(checkField(reviewText))) {
        reviewField.classList.toggle('invisible', false);
        reviewButton.disabled = true;
      } else if (checkField(reviewName) && !(checkField(reviewText))) {
        reviewFieldName.classList.toggle('invisible', true);
        reviewButton.disabled = true;
      } else if (!(checkField(reviewName)) && checkField(reviewText) ) {
        reviewFieldText.classList.toggle('invisible', true);
        reviewButton.disabled = true;
      } else {
        reviewFieldName.classList.toggle('invisible', true);
        reviewFieldText.classList.toggle('invisible', true);
        reviewButton.disabled = false;
      }
    } else {

      reviewFieldName.classList.toggle('invisible', false);
      reviewFieldText.classList.toggle('invisible', true);

      if (!(checkField(reviewName))) {
        reviewField.classList.toggle('invisible', false);
        reviewButton.disabled = true;
      } else {
        reviewField.classList.toggle('invisible', true);
        reviewButton.disabled = false;
      }
    }
  };

  form.onsubmit = function(evt) {
    evt.preventDefault();

    var now = new Date();
    var lastBirthday = new Date(now.setMonth(0, 22));
    var diff = Date.now() - lastBirthday.getTime();

    if (diff < 0) {
      lastBirthday.setFullYear(now.getFullYear() - 1);
      diff = Date.now() - lastBirthday.getTime();
    }

    var dateToExpire = Date.now() + diff;
    var formattedDateToExpire = new Date(dateToExpire).toUTCString();

    browserCookies.set('Mark', ratingItem.value, {expires: formattedDateToExpire});
    browserCookies.set('Name', reviewName.value, {expires: formattedDateToExpire});

    form.submit();

  };
})();
