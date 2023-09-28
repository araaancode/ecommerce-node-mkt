const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lasttName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'ایمیل معتبر نیست');
  }
}

// Check required fields
function checkRequired(inputArr) {
    console.log(inputArr);
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} الزامی است`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} حداقل باید ${min} کاراکتر باشد`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} حداکثر باید ${max} کاراکتر باشد`
    );
  } else {
    showSuccess(input);
  }
}



// Get fieldname
function getFieldName(input) {
  return input.parentElement.children[0].innerText
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  if(checkRequired([ firstName,lastName,email, password,confirmPassword])){
    checkLength(password, 8, 15);
    checkEmail(email);
  }

});