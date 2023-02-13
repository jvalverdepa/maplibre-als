import 'maplibre-gl/dist/maplibre-gl.css';

import type { MapStyle } from '@aws-amplify/geo';
import { Amplify, Auth, Geo } from 'aws-amplify';
import maplibregl, { RequestParameters } from 'maplibre-gl';
import { AmplifyMapLibreRequest } from 'maplibre-gl-js-amplify';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import Map, { NavigationControl } from 'react-map-gl';

if (
  !import.meta.env.STORYBOOK_IDENTITY_POOL_ID ||
  !import.meta.env.STORYBOOK_REGION ||
  !import.meta.env.STORYBOOK_MAP_NAME ||
  !import.meta.env.STORYBOOK_MAP_STYLE
) {
  throw Error('Env variables missing');
}
const styleProps = {
  height: '100%',
  position: 'relative' as const,
  width: '100%',
};

// Configuring Amplify Geo with existing Amazon Cognito and Amazon Location Service information
// Fill values in configuration.js
Amplify.configure({
  Auth: {
    identityPoolId: import.meta.env.STORYBOOK_IDENTITY_POOL_ID, // REQUIRED - Amazon Cognito Identity Pool ID
    region: import.meta.env.STORYBOOK_REGION, // REQUIRED - Amazon Cognito Region
  },
  geo: {
    AmazonLocationService: {
      maps: {
        items: {
          [import.meta.env.STORYBOOK_MAP_NAME]: {
            // REQUIRED - Amazon Location Service Map resource name
            style: [import.meta.env.STORYBOOK_MAP_STYLE], // REQUIRED - String representing the style of map resource
          },
        },
        default: [import.meta.env.STORYBOOK_MAP_NAME], // REQUIRED - Amazon Location Service Map resource name to set as default
      },
      region: import.meta.env.STORYBOOK_REGION, // REQUIRED - Amazon Location Service Region
    },
  },
});

export const ALSMapLibre = ({ children }: PropsWithChildren) => {
  const [longitude, setLng] = useState(-115.3150831);
  const [latitude, setLat] = useState(36.1251958);
  const [zoom, setZoom] = useState(11);

  const geoConfig = useMemo(() => Geo.getDefaultMap() as MapStyle & { region: string }, []);
  const [transformRequest, setTransformRequest] =
    useState<(url: string, resourceType: string) => RequestParameters>();

  /**
   * The transformRequest is a callback used by react-map-gl before it makes a request for an external URL. It signs
   * the request with AWS Sigv4 Auth, provided valid credentials, and is how we integrate react-map-gl with Amplify
   * and Amazon Location Service. Once the transformRequest is created, we render the map.
   */
  useEffect(() => {
    (async () => {
      const credentials = await Auth.currentUserCredentials();

      if (credentials) {
        const { region } = geoConfig;
        const { transformRequest: amplifyTransformRequest } = new AmplifyMapLibreRequest(
          credentials,
          region,
        );
        setTransformRequest(() => amplifyTransformRequest);
      }
    })();
  }, [geoConfig]);

  return transformRequest ? (
    <Map
      initialViewState={{
        latitude,
        longitude,
        zoom,
        bearing: 0,
      }}
      onMove={({ viewState }) => {
        setLng(viewState.longitude);
        setLat(viewState.latitude);
        setZoom(viewState.zoom);
      }}
      mapLib={maplibregl}
      mapStyle={geoConfig.mapName[0]}
      style={styleProps}
      transformRequest={transformRequest}
    >
      <div className='bg-slate-800 py-2 px-3 text-white absolute z-10 bottom-0 left-0 m-3 rounded font-mono'>
        Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
      </div>
      <NavigationControl position='bottom-right' />
      {children}
    </Map>
  ) : (
    <h1>Loading...</h1>
  );
};
