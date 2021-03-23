import React from 'react';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';

function OrderPage() {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  return (
    <>
      <SEO title="Order a Pizza!" />
      <form action="">
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  );
}

export default OrderPage;
