import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';

function Slicemaster({ data: { slicemaster } }) {
  return (
    <div className="center">
      <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
      <h2>
        <span className="mark">{slicemaster.name}</span>
      </h2>
      <p>{slicemaster.description}</p>
    </div>
  );
}

// this needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

export default Slicemaster;
