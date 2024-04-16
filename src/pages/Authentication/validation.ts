import { state } from 'app/state';

export const validation = (input: HTMLInputElement) => {
  const nameInput = document.querySelector('.name_input') as HTMLInputElement;
  const passwordInput = document.querySelector('.password_input') as HTMLInputElement;
  const errors = document.querySelectorAll('.error');
  const loginBtn = document.querySelector('.login_btn');
  const regexp: RegExp = /^[a-zA-Z\\-]+$/;
  const error = input.nextElementSibling as HTMLElement;

  const { value } = input;

  const errorMessages = {
    emptyField: 'Поле обязательное',
    invalidCharacters: 'Только английские буквы и дефисы',
    capitalLetters: 'Введите данные с заглавной буквы',
    shortFirstName: 'Имя должно состоять минимум из 3 букв',
    shortSurname: 'Пароль должен состоять минимум из 4 букв',
  };

  const tests = [
    { condition: !value, message: errorMessages.emptyField },
    { condition: !regexp.test(value), message: errorMessages.invalidCharacters },
    { condition: value[0] !== value[0]?.toUpperCase(), message: errorMessages.capitalLetters },
    { condition: input === nameInput && value.length < 3, message: errorMessages.shortFirstName },
    { condition: input === passwordInput && value.length < 4, message: errorMessages.shortSurname },
  ];

  const currentError = tests.find((item) => item.condition);

  if (error) {
    error.classList.toggle('error_active', !!currentError);
    error.innerHTML = currentError ? currentError.message : '';
  }

  const isInvalid =
    !nameInput.value ||
    !passwordInput.value ||
    Array.from(errors).some((item: Element) => item.classList.contains('error_active'));

  state.setCurrentUser({ login: nameInput.value, password: passwordInput.value });

  loginBtn?.classList.toggle('disabled', isInvalid);
  input.classList.toggle('invalid', !!currentError);
};
