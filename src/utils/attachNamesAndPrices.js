import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.nodes.find((curPizza) => curPizza.id === item.id);
    return {
      ...item,
      name: pizza.name,
      price: formatMoney(
        Math.ceil(calculatePizzaPrice(pizza.price, item.size))
      ),
      thumbnail: pizza.image.asset.fluid.src,
      size: item.size,
    };
  });
}

export default attachNamesAndPrices;
