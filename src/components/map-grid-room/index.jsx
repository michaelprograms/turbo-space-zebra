import { MapGridRoomWrapper, RoomCircle } from './style.js';

function MapGridRoom (props) {
  const { room } = { ...props };

  return (
    <MapGridRoomWrapper
      $enabled={room.enabled}
      $borderColor={room.borderColor}
      $borderRadius={room.borderRadius}
      $borderWidth={room.borderWidth}
    >
      { room?.northwestEnabled ?
        <div className="line-northwest-wrapper">
          <div className="line line-northwest"></div>
        </div>
        :
        null
      }
      { room?.northeastEnabled ?
        <div className="line-northeast-wrapper">
          <div className="line line-northeast"></div>
        </div>
        :
        null
      }
      { room?.southwestEnabled ?
        <div className="line-southwest-wrapper">
          <div className="line line-southwest"></div>
        </div>
        :
        null
      }
      { room?.southeastEnabled ?
        <div className="line-southeast-wrapper">
          <div className="line line-southeast"></div>
        </div>
        :
        null
      }
      { room?.northEnabled ?
        <div className="line line-north"></div>
        :
        null
      }
      { room?.southEnabled ?
        <div className="line line-south"></div>
        :
        null
      }
      { room?.westEnabled ?
        <div className="line line-west"></div>
        :
        null
      }
      { room?.eastEnabled ?
        <div className="line line-east"></div>
        :
        null
      }
      { room?.enabled ?
        <RoomCircle
          $fillColor={room.fillColor}
          $borderColor={room.borderColor}
          $borderRadius={room.borderRadius}
          $borderWidth={room.borderWidth}
        />
        :
        null
      }
    </MapGridRoomWrapper>
  );
}

export default MapGridRoom;