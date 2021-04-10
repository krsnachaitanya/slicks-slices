import { graphql } from 'gatsby';
import React from 'react';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <p>Currently Slicing</p>
    </div>
  );
}

function HotSlices() {
  return (
    <div>
      <p>Hot Slices</p>
    </div>
  );
}

function HomePage({ data: { homePage } }) {
  const { sliceMasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>{homePage.heading}</h1>
      <p>{homePage.openTiming}</p>
      <div>
        <CurrentlySlicing sliceMasters={sliceMasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}

export const query = graphql`
  query HomePageQuery {
    homePage: sanityStoreSettings {
      name
      openTiming
      heading
    }
  }
`;

export default HomePage;
