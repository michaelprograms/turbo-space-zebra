import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { EditableText } from '@blueprintjs/core';

import MapGrid from '../../components/map-grid';
import { db } from '../../data';

import './map.css';

function Map () {
  let { id } = useParams();

  const mapData = useLiveQuery(async () => {
    return await db.maps.where({ id: +id }).first();
  }, [id]);

  console.log('Loading Map', mapData);

  const confirmEditTitle = async (text) => {
    try {
      await db.maps.where('id').equals(+id).modify({ name: text });
    } catch (error) {
      console.log(`Failed to add update map name: ${error}`);
    }
  };

  return (
    <div className="map">
      {
      mapData ?
        <Fragment>
          <div>
            <EditableText
              intent="primary"
              maxLength="64"
              onConfirm={(e) => confirmEditTitle(e)}
              defaultValue={mapData.name}
            />
            <div>#{mapData.id}</div>
          </div>
          <MapGrid mapData={mapData} />
        </Fragment>
        :
        <h3>Loading...</h3>
      }
    </div>
  );
}

export default Map;