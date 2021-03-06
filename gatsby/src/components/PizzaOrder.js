import React from 'react';
import Img from 'gatsby-image';
import MenuStyles from '../styles/MenuStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

function PizzaOrder({ order, pizzas, removeFromOrder }) {
  if (order.length >= 1) {
    return (
      <>
        {order.map((orderItem, i) => {
          const pizza = pizzas.nodes.find(
            (singlePizza) => singlePizza.id === orderItem.id
          );
          return (
            <MenuStyles key={`${pizza.id}-${i}`}>
              <Img fluid={pizza.image.asset.fluid} />
              <h2>{pizza.name}</h2>
              <p>
                {orderItem.size}{' '}
                {formatMoney(
                  Math.ceil(calculatePizzaPrice(pizza.price, orderItem.size))
                )}
              </p>
              <button
                type="button"
                className="remove"
                title={`Remove ${orderItem.size} ${pizza.name} from Order`}
                onClick={() => removeFromOrder(i)}
              >
                x
              </button>
            </MenuStyles>
          );
        })}
      </>
    );
  }
  return (
    <p>Chef is ready to cook something awesome for you. Order Ahead!...</p>
  );
}

export default PizzaOrder;
