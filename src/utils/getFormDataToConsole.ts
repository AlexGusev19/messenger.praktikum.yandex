export function getFormDataToConsole(form: HTMLFormElement) {
  const formValue = new FormData(form);
  const result: { [key: string]: FormDataEntryValue } = {};

  for (const [key, value] of formValue) {
    result[key] = value;
  }
  console.log({ ...result });

  return { ...result };
}
