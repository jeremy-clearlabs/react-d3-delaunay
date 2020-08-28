import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Delaunay } from 'd3';

import PrintoutSampleSiteLocation from './PrintoutSampleSiteLocation';
import samples from './samples.json';
import image from './image.json';

const Wrapper = styled.div`
  display: flex;
  margin: 2rem 3rem;
  flex-direction: column;
  page-break-after: always;
  width: 100vw;
  height: 100vh;
`;
const MapSection = styled.section`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
const FloorMapWrapper = styled.section`
  position: relative;
`;
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  max-height: 700px;
  max-width: auto;
`;
const SVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  max-height: 700px;
  max-width: auto;
`;

const PrintMapSheet = () => {
  const floorDimensions = {
    height: 4980,
    width: 7954,
  };
  const zoomLevel = 1 / (700 / floorDimensions.height);

  const samplePoints = samples.map((sample) => [
    sample.sampleSite.sampleSitePosition.x,
    sample.sampleSite.sampleSitePosition.y,
  ]);
  // const points = [
  //   [0, 0],
  //   [0, 1],
  //   [1, 0],
  //   [1, 1],
  // ];
  console.log('samplePoints', samplePoints);
  const delaunay = Delaunay.from(samplePoints);
  const voronoi = delaunay.voronoi([
    0,
    0,
    floorDimensions.width,
    floorDimensions.height,
  ]);
  const cells = samplePoints.map((d, i) => [d, voronoi.cellPolygon(i)]);
  console.log('cells', cells);

  return (
    <Wrapper>
      <MapSection>
        <FloorMapWrapper>
          <Image src={image.src} alt="floor plan" />
          <SVG
            viewBox={`0 0 ${floorDimensions.width} ${floorDimensions.height}`}
          >
            {samples.map((sample, index) => (
              <PrintoutSampleSiteLocation
                key={`sample-site-location-${index.toString()}`}
                sampleSiteItem={sample}
                zoomLevel={zoomLevel}
                centroidPath={cells[index][0]}
                cell={cells[index][1]}
              />
            ))}
            {/* {samples.map((_, index) => (
              <path
                d={voronoi.renderCell(index)}
                stroke="yellow"
                strokeWidth={10}
                fill="none"
              />
            ))} */}
          </SVG>
        </FloorMapWrapper>
      </MapSection>
    </Wrapper>
  );
};

PrintMapSheet.propTypes = {
  collectionEventDetails: PropTypes.object,
  floorDetails: PropTypes.object,
};
export default PrintMapSheet;
