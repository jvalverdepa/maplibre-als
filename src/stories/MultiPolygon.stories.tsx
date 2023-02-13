import { ComponentMeta, ComponentStory } from "@storybook/react";
import { bbox } from "@turf/turf";
import { useEffect } from "react";
import { Layer, Source, useMap } from "react-map-gl";

import { multiPolygonData1 } from "./multipolygon-data";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MapLibre/MultiPolygon",
} as ComponentMeta<typeof Source>;

const Template: ComponentStory<typeof Source> = (args) => (
  <Source id="multi-polygons-source" {...args}>
    <Layer
      id="polygons"
      type="fill"
      source="multi-polygons-source"
      paint={{
        "fill-color": "#9f34ff",
        "fill-opacity": 0.3,
      }}
    />
  </Source>
);

export const CalculateBounds = () => {
  const { current: map } = useMap();

  const multiPolygonBb = bbox(multiPolygonData1);

  useEffect(() => {
    map?.fitBounds(multiPolygonBb as [number, number, number, number], {
      duration: 0,
      padding: 50,
    });
  }, []);

  return <Template data={multiPolygonData1} type="geojson" />;
};
