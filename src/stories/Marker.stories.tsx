import { ComponentMeta, ComponentStory } from "@storybook/react";
import { wktToGeoJSON } from "@terraformer/wkt";
import { useEffect } from "react";
import { Marker, useMap } from "react-map-gl";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MapLibre/Marker",
  component: Marker,
} as ComponentMeta<typeof Marker>;

const Template: ComponentStory<typeof Marker> = (args) => <Marker {...args} />;

export const Fixed = () => {
  const { current: map } = useMap();

  useEffect(() => {
    map?.setZoom(17);

    map?.setCenter([-115.1780188, 36.1129203]);
  }, []);

  return <Template longitude={-115.1780188} latitude={36.1129203} />;
};

export const CalculateBounds = () => {
  const { current: map } = useMap();

  useEffect(() => {
    map?.setZoom(17);

    const data = wktToGeoJSON("POINT (-115.1780188 36.1129203)");
    if (data.type === "Point") {
      map?.setCenter(data.coordinates as [number, number]);
    }
  }, []);

  return <Template longitude={-115.1780188} latitude={36.1129203} />;
};
