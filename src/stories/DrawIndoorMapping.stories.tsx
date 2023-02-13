import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import { useEffect } from 'react';
import { Layer, Source, useMap } from 'react-map-gl';

import useMapboxDraw from '../components/useMapboxDraw';
import { useMapboxDrawActions } from '../components/useMapboxDrawActions';
import { indoorMappingData } from './indoor-mapping-data';

export default {
  title: 'MapLibre/Draw/IndoorMapping',
};

export const Editing = () => {
  const { current: map } = useMap();
  const { onCreate, onUpdate, onDelete } = useMapboxDrawActions();
  useMapboxDraw({
    position: 'top-left',
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
    map?.setZoom(15.99);
    map?.setCenter([-87.61694, 41.86625]);
  }, []);

  return (
    <Source id='floorplan' type='geojson' data={indoorMappingData}>
      <Layer
        id='room-extrusion'
        type='fill-extrusion'
        source='floorplan'
        paint={{
          // See the MapLibre Style Specification for details on data expressions.
          // https://maplibre.org/maplibre-gl-js-docs/style-spec/expressions/

          // Get the fill-extrusion-color from the source 'color' property.
          'fill-extrusion-color': ['get', 'color'],

          // Get fill-extrusion-height from the source 'height' property.
          'fill-extrusion-height': ['get', 'height'],

          // Get fill-extrusion-base from the source 'base_height' property.
          'fill-extrusion-base': ['get', 'base_height'],

          // Make extrusions slightly opaque for see through indoor walls.
          'fill-extrusion-opacity': 0.5,
        }}
      />
    </Source>
  );
};
