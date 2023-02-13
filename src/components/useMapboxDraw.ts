import MapboxDraw from '@mapbox/mapbox-gl-draw';
import noop from 'lodash/noop';
import type { ControlPosition } from 'react-map-gl';
import { useControl } from 'react-map-gl';

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (e: MapboxDraw.DrawCreateEvent) => void;
  onUpdate?: (e: MapboxDraw.DrawUpdateEvent) => void;
  onDelete?: (e: MapboxDraw.DrawDeleteEvent) => void;
  onCombine?: (e: MapboxDraw.DrawCombineEvent) => void;
};

export default function useMapboxDraw({
  onCreate = noop,
  onUpdate = noop,
  onDelete = noop,
  onCombine = noop,
  position,
  ...rest
}: DrawControlProps) {
  return useControl<MapboxDraw>(
    () => new MapboxDraw(rest),
    ({ map }) => {
      map.on('draw.create', onCreate);
      map.on('draw.update', onUpdate);
      map.on('draw.delete', onDelete);
      map.on('draw.combine', onCombine);
    },
    ({ map }) => {
      map.off('draw.create', onCreate);
      map.off('draw.update', onUpdate);
      map.off('draw.delete', onDelete);
      map.off('draw.combine', onCombine);
    },
    {
      position: position,
    },
  ) as MapboxDraw;
}
