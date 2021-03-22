import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // get a template for this pages
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // what is the url for this new page?
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: { slug: pizza.slug.current },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // get a template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // create a page for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // what is the url for this new page?
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // todo regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // pass topping data to pizza.js
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // get a template
  const slicemasterTemplate = path.resolve('./src/pages/slicemasters.js');
  // query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // create a page for each slicemaster
  // get a template
  const singleSlicemasterTemplate = path.resolve(
    './src/templates/Slicemaster.js'
  );
  data.slicemasters.nodes.forEach((person) => {
    actions.createPage({
      // what is the url for this new page?
      path: `slicemaster/${person.slug.current}`,
      component: singleSlicemasterTemplate,
      context: {
        slug: person.slug.current,
      },
    });
  });
  // figure out how many pages there are based on how many slicemasters there are, and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // loop from 1 to n and create pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      // what is the url for this new page?
      path: `/slicemasters/page${i + 1}`,
      component: slicemasterTemplate,
      // this data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // fetch a list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // loop over each one
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // create node for that beer
    actions.createNode({ ...beer, ...nodeMeta });
  }
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby api;
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // create pages dynamically
  // wait for all promises to be resolved before finishing this function
  await Promise.all([
    // pizzas
    turnPizzasIntoPages(params),
    // toppings
    turnToppingsIntoPages(params),
    // slicemasters
    turnSlicemastersIntoPages(params),
  ]);
}
