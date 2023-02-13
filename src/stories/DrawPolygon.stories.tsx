import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import { useEffect } from 'react';
import { Layer, Source, useMap } from 'react-map-gl';

import useMapboxDraw from '../components/useMapboxDraw';
import { useMapboxDrawActions } from '../components/useMapboxDrawActions';
import { polygonData2 } from './polygon-data';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'MapLibre/Draw/Polygon',
};

export const Empty = () => {
  const { current: map } = useMap();

  const { onCreate, onUpdate, onDelete } = useMapboxDrawActions();

  useMapboxDraw({
    position: 'top-left',
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
    defaultMode: 'draw_polygon',
    onCreate,
    onUpdate,
    onDelete,
  });

  useEffect(() => {
    map?.setZoom(17);
    map?.setCenter([-115.1780188, 36.1129203]);
  }, []);
};

const ada = {
  id: '73b6947be72beebc214b22257922957a',
  type: 'Feature',
  properties: {},
  geometry: {
    coordinates: [
      [
        [-115.1786518013273, 36.113557348766406],
        [-115.17676352618064, 36.11351834592929],
        [-115.17766474840991, 36.11199288643817],
        [-115.180100194195, 36.11221824027341],
        [-115.17947255728568, 36.113583350647076],
        [-115.17887710688451, 36.113466342116325],
        [-115.1786518013273, 36.113557348766406],
      ],
    ],
    type: 'Polygon',
  },
};

export const EditSingle = () => {
  const { current: map } = useMap();
  const { onCreate, onUpdate, onDelete } = useMapboxDrawActions();
  const mapboxDraw = useMapboxDraw({
    position: 'bottom-right',
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
    onCreate,
    onUpdate,
    onDelete,
  });

  useEffect(() => {
    map?.setZoom(17);
    map?.setCenter([-115.1780188, 36.1129203]);
    mapboxDraw.add(polygonData2);
  }, []);

  return null;
};

export const EditChild = () => {
  const { current: map } = useMap();
  const { onCreate, onUpdate, onDelete } = useMapboxDrawActions();
  const mapboxDraw = useMapboxDraw({
    position: 'bottom-right',
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
    onCreate,
    onUpdate,
    onDelete,
  });

  useEffect(() => {
    map?.setZoom(17);
    map?.setCenter([-115.1780188, 36.1129203]);
    mapboxDraw.add(polygonData2);
  }, []);

  return (
    <Source id='multi-polygons-source' type='geojson' data={ada}>
      <Layer
        id='polygons'
        type='fill'
        source='multi-polygons-source'
        paint={{
          'fill-color': '#9f34ff',
          'fill-opacity': 0.3,
        }}
      />
    </Source>
  );
};
