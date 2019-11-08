
/**********************************************
 *  Валидация
 ********************************************/

 const nameTamplate = /^[A-Za-z]{2,20}|^[А-Яа-я]{2,20}$/;
 const formOrder = document.querySelector('.form-order');
 const inputName = formOrder.querySelector('.form-order__input--first-name');

// console.log(nameTamplate.test('Вовывввввввввфывфывфывфывваывываываываывааываываываывавыаываан'));
// console.log(nameTamplate.test('Vovan'));
// console.log(nameTamplate.test('V'));
// console.log(nameTamplate.test('Vo'));
// console.log(nameTamplate.test('В'));

const checkNameValidate = (value) => {
  // console.log(typeof(value))
  return nameTamplate.test(value);
}


inputName.addEventListener('change', (evt) => {
  if (checkNameValidate(inputName.value)) {

  } else {
    inputName.setCustomValidity('нельзя вводить цифры')
  }

})
