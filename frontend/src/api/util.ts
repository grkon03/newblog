export function ToFormData(obj: Record<string, any>): FormData {
  const formdata = new FormData();

  for (const key in obj) {
    Append(formdata, key, obj[key]);
  }

  return formdata;
}

function Append(formdata: FormData, key: string, value: any) {
  if (value === null || value === undefined) return;

  if (Array.isArray(value)) {
    value.forEach((elem) => {
      Append(formdata, key, elem);
    });
  } else if (value instanceof File || value instanceof Blob) {
    formdata.append(key, value);
  } else if (typeof value === 'object') {
    formdata.append(key, JSON.stringify(value));
  } else {
    // for premitive
    formdata.append(key, String(value));
  }
}
