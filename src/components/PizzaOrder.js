import React from 'react';
import Img from 'gatsby-image';
import MenuStyles from '../styles/MenuStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <div>
      <p>You have {order.length} items in your order!</p>
      {order.map((orderItem, i) => {
        const pizza = pizzas.nodes.find(
          (singlePizza) => singlePizza.id === orderItem.id
        );
        return (
          <MenuStyles key={pizza.id}>
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
    </div>
  );
}

export default PizzaOrder;
