import classNames from 'classnames';
import { useState } from 'react';
import { Marker, useMap } from 'react-map-gl';

import { MapSidebar } from '../components/MapSidebar';
import { properties, Property } from './properties';

export default {
  title: 'MapLibre/Feature',
};

interface CollectionItemProps {
  property: Property;
  selectedId: string | undefined;
  onSelect: (property: Property) => void;
}

const CollectionItem = ({ property, onSelect, selectedId }: CollectionItemProps) => (
  <div
    className={classNames(
      'pointer-events-auto rounded-lg bg-white p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 hover:bg-slate-50 hover:cursor-pointer ring-1 ring-slate-700/10',
      {
        'ring-2 ring-sky-700': selectedId === property.id,
      },
    )}
    onClick={() => onSelect(property)}
  >
    <div className='flex justify-between'>
      <div className='font-medium text-slate-900'>
        {property.name} ({property.regionName})
      </div>
    </div>
    <div className='mt-1 text-slate-700'>{property.location.address}</div>
    <div className='mt-6 font-medium text-slate-900'>
      [{property.location.latitude} {property.location.latitude}]
    </div>
  </div>
);

export const FeatureCollection = () => {
  const { current: map } = useMap();
  const [selectedProperty, setSelectedProperty] = useState<Property>();

  const onSelect = (property: Property) => {
    if (!property.location.longitude || !property.location.latitude) {
      alert('No coordinates provided.');
      return;
    }

    map?.easeTo({
      center: {
        lat: property.location.latitude,
        lon: property.location.longitude,
      },
    });
    setSelectedProperty(property);
  };

  return (
    <MapSidebar position='left'>
      <div className='flex flex-col gap-4'>
        {properties.map((property) => (
          <CollectionItem
            key={property.id}
            property={property}
            onSelect={onSelect}
            selectedId={selectedProperty?.id}
          />
        ))}
        {selectedProperty?.location.longitude && selectedProperty?.location.latitude && (
          <Marker
            longitude={selectedProperty.location.longitude}
            latitude={selectedProperty.location.latitude}
          />
        )}
      </div>
    </MapSidebar>
  );
};
