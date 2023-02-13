import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Feature } from 'geojson';
import { useCallback, useState } from 'react';

export const useMapboxDrawActions = () => {
  const [features, setFeatures] = useState<{ [guid: string]: Feature }>({});

  const onCreate = useCallback((e: MapboxDraw.DrawCreateEvent) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        if (f.id) newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onUpdate = useCallback((e: MapboxDraw.DrawUpdateEvent) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        if (f.id) newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e: MapboxDraw.DrawDeleteEvent) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        if (f.id) delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  const onCombine = useCallback((e: MapboxDraw.DrawCombineEvent) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };

      for (const f of e.deletedFeatures) {
        if (f.id) delete newFeatures[f.id];
      }

      for (const f of e.createdFeatures) {
        if (f.id) newFeatures[f.id] = f;
      }

      return newFeatures;
    });
  }, []);

  return {
    features,
    setFeatures,
    onCreate,
    onUpdate,
    onDelete,
    onCombine,
  };
};
