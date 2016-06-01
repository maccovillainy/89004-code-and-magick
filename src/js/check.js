function multiplyArrays(arr1, arr2) {
    var result = 0;
    for(var i = 0; i < arr1.length; i++) {
      result += arr1[i] * arr2[i];
    }
    return result;
}

function sumArrays(arr) {
  var sum = 0;
  for(var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
    return sum;
}

function getMessage(a, b) {
  var message;

  if ( typeof a === 'boolean' ) {
    message = a ? 'Я попал в ' + b : 'Я никуда не попал';
  } else if ( typeof a === 'number' ) {
    message = 'Я прыгнул на ' + a * 100 + ' сантиметров';
  } else if (Array.isArray(a)) {
    if (Array.isArray(b)) {
      message = 'Я прошёл ' + multiplyArrays(a, b) + ' метров';
    } else {
      message = 'Я прошёл ' + sumArrays(a) + ' шагов';
    }
  }

  return message;
}
