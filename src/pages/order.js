import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuStyles from '../styles/MenuStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

function OrderPage({ data: { pizzas } }) {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    sugarRush: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    inputs: values,
  });
  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
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
          <input
            className="sugarRush"
            autoComplete="off"
            type="sugarRush"
            name="sugarRush"
            value={values.sugarRush}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.nodes.map((pizza) => (
            <MenuStyles key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => addToOrder({ id: pizza.id, size })}
                  >
                    {size}{' '}
                    {formatMoney(
                      Math.ceil(calculatePizzaPrice(pizza.price, size))
                    )}
                  </button>
                ))}
              </div>
            </MenuStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          {message ? (
            <p>{message}</p>
          ) : (
            <>
              <legend>Order</legend>
              <PizzaOrder
                pizzas={pizzas}
                order={order}
                removeFromOrder={removeFromOrder}
              />
            </>
          )}
        </fieldset>
        <fieldset className="order-total" disabled={loading}>
          <h3>
            Total Amount:
            {formatMoney(Math.ceil(calculateOrderTotal(order, pizzas)))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead!'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default OrderPage;
