import { useState } from 'react';

function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if the value is number and convert
    let { value } = e.target.value;
    if (e.target.type === 'number') value = parseInt(value);
    setValues({
      // copy the existing values into items
      ...values,
      // update the new value that changed
      [e.target.name]: value,
    });
  }
  return { values, updateValue };
}

export default useForm;
