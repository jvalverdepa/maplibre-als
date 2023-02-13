import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useEffect } from "react";
import { Layer, Source, useMap } from "react-map-gl";

import { polygoData1 } from "./polygon-data";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MapLibre/Polygon",
} as ComponentMeta<typeof Source>;

const Template: ComponentStory<typeof Source> = (args) => (
  <Source id="polygons-source" {...args}>
    <Layer
      id="polygons"
      type="fill"
      source="polygons-source"
      paint={{
        "fill-color": "#9f34ff",
        "fill-opacity": 0.3,
      }}
    />
  </Source>
);

export const Fixed = () => {
  const { current: map } = useMap();

  useEffect(() => {
    map?.setZoom(11);
    map?.setCenter([-123.12418699264526, 49.257303093397304]);
  }, []);

  return <Template data={polygoData1} type="geojson" />;
};
