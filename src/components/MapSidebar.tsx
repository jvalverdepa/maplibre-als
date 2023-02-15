import classNames from 'classnames';
import { PropsWithChildren, useState } from 'react';
import { PaddingOptions, useMap } from 'react-map-gl';

export const MapSidebar = ({
  position,
  children,
}: PropsWithChildren<{ position: 'left' | 'right' }>) => {
  const { current: map } = useMap();
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    const padding: PaddingOptions = {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    };

    if (collapsed) {
      // Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
      setCollapsed(false);

      padding[position] = 300; // In px, matches the width of the sidebars set in .sidebar CSS class
      map?.easeTo({
        padding,
        duration: 1000, // In ms, CSS transition duration property for the sidebar matches this value
      });
    } else {
      padding[position] = 0;
      setCollapsed(true);

      map?.easeTo({
        padding,
        duration: 1000,
      });
    }
  };

  return (
    <div
      className={classNames(
        'transition-transform ease-out duration-1000 z-10 w-80 h-full absolute flex p-2',
        {
          '-translate-x-80': collapsed && position === 'left',
          'translate-x-80': collapsed && position === 'right',
        },
      )}
    >
      <div className='w-full h-full overflow-y-auto p-4 font-sans text-3xl bg-white rounded-lg shadow-2xl'>
        {children}
        <div
          className={classNames(
            'absolute top-0 bottom-0 m-auto w-[1.3em] h-[1.3em] flex justify-center hover:text-sky-700 hover:cursor-pointer bg-white rounded-lg shadow-2xl',
            {
              '-right-[1.5em]': position === 'left',
              '-left-[1.5em]': position === 'right',
            },
          )}
          onClick={toggleSidebar}
        >
          {position === 'left' ? <>&rarr;</> : <>&larr;</>}
        </div>
      </div>
    </div>
  );
};
