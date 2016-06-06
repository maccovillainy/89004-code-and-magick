'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = document.querySelector('.review-form');
  var reviewLinks = document.querySelector('.review-fields');
  var reviewLinksText = document.querySelector('.review-fields-text');
  var reviewLinksName = document.querySelector('.review-fields-name');

  var nameField = document.querySelector('#review-name');
  var reviewField = document.querySelector('#review-text');
  var formSubmitButton = document.querySelector('.review-submit');
  var ratingForm = document.querySelector('.review-form-group-mark');
  var MIN_RATING = 3;
  var isLowRating;

  //Проверка рейтинга, если рейтинг отрицательный, то значение переменной isLowRating устанавливается в true
  var checkRating = function() {
    for (var i = 0; i < ratingForm.elements.length; i++) {
      if (i < MIN_RATING && ratingForm.elements[i].checked) {
        isLowRating = true;
        reviewField.required = true;
        break;
      } else if (i >= MIN_RATING && ratingForm.elements[i].checked) {
        isLowRating = false;
        reviewField.required = false;
      }
    }
  };

  //Проверка поля, если поле заполнено, то возврщается true
  var checkField = function(field) {
    return field.value !== '';
  };

  //Поле "Имя" всегда обязательное
  nameField.required = true;
  reviewField.required = isLowRating && !(reviewField.value);
  formSubmitButton.disabled = true;

  //При изменении рейтинга, проверяем, не установлен ли он в значение меньше 3
  ratingForm.onchange = function(evt) {
    evt.preventDefault();
    checkRating();
    reviewLinksText.classList.toggle('invisible', !isLowRating);
  };

  form.oninput = function() {
    //Проверить рейтинг
    checkRating();

    //Если рейтинг низкий, то проверить заполнено ли поле Имя и Отзыв
    //Если рейтинг высокий, то проверить только Имя

    if (isLowRating) {
      reviewLinksText.classList.toggle('invisible', checkField(reviewField));
      reviewLinksName.classList.toggle('invisible', checkField(nameField));
      reviewLinks.classList.toggle('invisible', checkField(nameField) && checkField(reviewField));

      formSubmitButton.disabled = !(checkField(nameField) && checkField(reviewField));
    } else {
      reviewField.required = isLowRating;
      reviewLinks.classList.toggle('invisible', checkField(nameField));

      formSubmitButton.disabled = !checkField(nameField);
    }
  };

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
