import { useEffect, useState } from 'react';

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();

  // slice masters
  const [sliceMasters, setSliceMasters] = useState();

  // use useEffect hook to fetch data from graphql endpoint
  useEffect(() => {
    // when the component loads fetch data from
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            query {
              StoreSettings(id: "downtown") {
                name
                 slicemaster {
                    name
                   }
                 hotSlices{
                   name
                 }
               }
            }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
        console.log(res.data);
      });
  }, []);

  return {
    hotSlices,
    sliceMasters,
  };
}
