import { graphql } from 'gatsby';
import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ sliceMasters }) {
  return (
    <div>
      {!sliceMasters && <LoadingGrid count={4} />}
      {sliceMasters && !sliceMasters?.length && (
        <p>No one is working right now!</p>
      )}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing in the case!</p>}
    </div>
  );
}

function HomePage({ data: { homePage } }) {
  const { sliceMasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>{homePage.heading}</h1>
      <p>{homePage.openTiming}</p>
      <HomePageGrid>
        <CurrentlySlicing sliceMasters={sliceMasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
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
