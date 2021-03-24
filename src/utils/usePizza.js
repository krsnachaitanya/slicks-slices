import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // create some state to hold our order
  // Moved the use state up to the order provider
  // const [order, setOrder] = useState([]);
  // we access both our state and our update function setOrder from context
  const [order, setOrder] = useContext(OrderContext);
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
  // send this data to a serverless function when they check out

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
