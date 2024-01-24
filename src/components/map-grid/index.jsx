import { forwardRef } from 'react';

import {
  MapGridWrapper,
  MapTitleText,
  MapGridRow,
  MapGridCell,
  MapGridRoom,
} from './style.js';

const MapGrid = forwardRef(function MapGrid (props, ref) {
  const { mapData, mapName, focusX, focusY, handleGridOnClick } = { ...props };

  const confirmEditTitle = async (text) => {
    mapData.name = text;
  };

  return (
    <MapGridWrapper ref={ref} >
      { mapData ?
        <MapTitleText
          maxLength='64'
          onConfirm={(e) => confirmEditTitle(e)}
          defaultValue={mapName}
        />
        :
        <h3>No map title yet</h3>
      }
      { mapData ?
        mapData.map((row,x) => (
          <MapGridRow key={'row-'+x}>
          {row.map((room,y) => (
            <MapGridCell
              $focused={x === focusX && y === focusY ? 1 : 0}
              key={x+'-'+y}
              onClick={handleGridOnClick}
              x={x}
              y={y}
            >
              <MapGridRoom
                $enabled={room.enabled}
                $borderColor={room.borderColor}
                $borderRadius={room.borderRadius}
                $borderWidth={room.borderWidth}
              />
            </MapGridCell>
          ))}
          </MapGridRow>
        ))
        :
        <h3>No map data yet</h3>
      }
    </MapGridWrapper>
  );
});

export default MapGrid;
