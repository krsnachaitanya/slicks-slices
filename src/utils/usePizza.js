import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, inputs }) {
  // create some state to hold our order
  // Moved the use state up to the order provider
  // const [order, setOrder] = useState([]);
  // we access both our state and our update function setOrder from context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // make a function add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // make a function remove things from order
  function removeFromOrder(index) {
    setOrder([
      // all the items before the pizza we want to remove
      ...order.slice(0, index),
      // all the items after the pizza we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // this function runs when the form is submitted
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(Math.ceil(calculateOrderTotal(order, pizzas))),
      name: inputs.name,
      email: inputs.email,
    };
    // send this data to a serverless function when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    // check if everything worked
    if (res.status >= 400 && res.status <= 600) {
      setLoading(false);
      setError(text.message);
    } else {
      // it worked
      setLoading(false);
      setMessage('Success! We have received your order');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
