import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import { useEffect } from 'react';
import { useMap } from 'react-map-gl';

import useMapboxDraw from '../components/useMapboxDraw';
import { useMapboxDrawActions } from '../components/useMapboxDrawActions';
import { polygonData2 } from './polygon-data';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'MapLibre/Draw/Point',
};

export const Limit = () => {
  const { current: map } = useMap();
  const { onCreate, onUpdate, onDelete } = useMapboxDrawActions();
  const mapboxDraw = useMapboxDraw({
    position: 'top-left',
    displayControlsDefault: false,
    controls: {
      point: true,
      trash: true,
    },
    defaultMode: 'draw_point',
    onCreate,
    onUpdate,
    onDelete,
  });

  useEffect(() => {
    map?.setZoom(17);
    map?.setCenter([-115.1780188, 36.1129203]);
    mapboxDraw.add(polygonData2);
  }, []);

  return <></>;
};
