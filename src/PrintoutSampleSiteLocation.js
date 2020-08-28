import React from 'react';
import PropTypes from 'prop-types';
import { polygonCentroid } from 'd3';

const PrintoutSampleSiteLocation = ({ sampleSiteItem, zoomLevel, cell, centroidPath }) => {
  const { sampleSite } = sampleSiteItem;
  const { sampleSitePosition } = sampleSite;
  const centroid = polygonCentroid(cell);

  return (
    <g>
      <circle
        cx={sampleSitePosition.x}
        cy={sampleSitePosition.y}
        r={6 * zoomLevel}
        fill="white"
      />
      <defs>
        <filter x="0" y="0" width="1" height="1" id="text-background">
          <feFlood floodColor="#f0f0f0" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <path
        d={`M${centroid}L${centroidPath}`}
        stroke="yellow"
        strokeWidth={10}
        fill="none"
      />
      <text
        x={centroid[0]}
        y={centroid[1]}
        dx="20"
        fontFamily="HelveticaNeue"
        filter="url(#text-background)"
        fill="black"
        fontSize={12 * zoomLevel}
        textAnchor="middle"
      >
        {(sampleSiteItem && sampleSiteItem.clientSampleId) || '-'}
      </text>
    </g>
  );
};

PrintoutSampleSiteLocation.propTypes = {
  sampleSiteItem: PropTypes.object,
  ratio: PropTypes.number,
};

export default PrintoutSampleSiteLocation;
