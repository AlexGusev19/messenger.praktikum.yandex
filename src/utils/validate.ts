export function validateElement(element: HTMLInputElement) {
  const validationRules: Record<string, RegExp> = {
    first_name: /^[A-ZА-ЯЁ]{1}[-A-Za-zА-ЯЁа-яё]{2,}$/,
    second_name: /^[A-ZА-ЯЁ]{1}[-A-Za-zА-ЯЁа-яё]{2,}$/,
    login: /^[\w\d_-]{3,20}$/,
    display_name: /^[\wА-ЯЁа-яё\d_-]{3,20}$/,
    email: /^[\w_-]+@[\w]+[.]{1}[\w]+$/,
    phone: /^[+]*[\d]{10,15}$/,
    password: /^[\w\d]{8,40}$/,
    password2: /^[\w\d]{8,40}$/,
    newPassword: /^[\w\d]{8,40}$/,
    newPassword2: /^[\w\d]{8,40}$/,
    oldPassword: /^[\w\d]{8,40}$/,
    message: /^.+$/,
  };

  let validationStatus = true;

  if (validationRules[element.name]) {
    validationStatus = validationRules[element.name].test(element.value);
    const errorSpan = document.querySelector(
      `[data-for=${element.name}]`,
    ) as HTMLSpanElement;
    if (errorSpan)
      errorSpan.style.display = validationStatus ? 'none' : 'block';
  }

  return validationStatus;
}

export function formValidate(form: HTMLFormElement): boolean {
  let isFormValid = true;
  for (const formControl of form.elements) {
    if (formControl instanceof HTMLInputElement) {
      if (!validateElement(formControl) && isFormValid) {
        isFormValid = false;
      }
    }
  }
  return isFormValid;
}

export function handleFormButtonClick(
  form: HTMLFormElement,
  callBack: (args: unknown) => void,
) {
  if (form && formValidate(form)) {
    callBack(form);
    form.reset();
  } else {
    console.log('Форма не валидна.');
  }
}
