import { Fragment } from 'react';

import { MapGridRoomWrapper, RoomCircle } from './style.js';

function MapGridRoom (props) {
  const { room } = { ...props };

  if (Object.keys(room).length) {
    console.log('MapGridRoom', room);
  }

  return (
    <MapGridRoomWrapper
      $enabled={room.enabled}
      $borderColor={room.borderColor}
      $borderRadius={room.borderRadius}
      $borderWidth={room.borderWidth}
    >
      { room?.enabled ?
        <Fragment>
          <div className="line-northwest-wrapper">
            <div className="line line-northwest"></div>
          </div>
          <div className="line-northeast-wrapper">
            <div className="line line-northeast"></div>
          </div>
          <div className="line-southwest-wrapper">
            <div className="line line-southwest"></div>
          </div>
          <div className="line-southeast-wrapper">
            <div className="line line-southeast"></div>
          </div>
          <div className="line line-north"></div>
          <div className="line line-south"></div>
          <div className="line line-west"></div>
          <div className="line line-east"></div>
          <RoomCircle
            $fillColor={room.fillColor}
            $borderColor={room.borderColor}
            $borderRadius={room.borderRadius}
            $borderWidth={room.borderWidth}
          />
        </Fragment>
        :
        null
      }
    </MapGridRoomWrapper>
  );
}

export default MapGridRoom;