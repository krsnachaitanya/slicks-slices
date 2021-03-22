import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  // computer name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Generates slug using name',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Add pizza image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in rupees',
      validation: (Rule) => Rule.min(200).max(2000),
      // todo: add custom input component
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
      validation: (Rule) =>
        Rule.custom((toppings) => {
          if (toppings.length > 11) {
            return 'You can only add up to 10 toppings!';
          }
          return true;
        }),
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
      isveg0: 'toppings.0.vegetarian',
      isveg1: 'toppings.1.vegetarian',
      isveg2: 'toppings.2.vegetarian',
      isveg3: 'toppings.3.vegetarian',
      isveg4: 'toppings.4.vegetarian',
      isveg5: 'toppings.5.vegetarian',
      isveg6: 'toppings.6.vegetarian',
      isveg7: 'toppings.7.vegetarian',
      isveg8: 'toppings.8.vegetarian',
      isveg9: 'toppings.9.vegetarian',
    },
    prepare: ({
      title,
      media,
      topping0,
      topping1,
      topping2,
      topping3,
      ...isveg
    }) => {
      // filter undefined toppings out
      const tops = Object.values([
        topping0,
        topping1,
        topping2,
        topping3,
      ]).filter(Boolean);
      // find out if pizza is veg
      const isPizzaVeg = Object.values(isveg)
        .filter((e) => e !== undefined)
        .every((e) => e === true);
      // return the preview object for the pizza
      return {
        title: `${isPizzaVeg ? '🌿' : ''} ${title}`,
        media,
        subtitle: Object.values(tops).join(', '),
      };
    },
  },
};
