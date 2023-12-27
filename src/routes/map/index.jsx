import { useParams } from 'react-router-dom';

import MapGrid from '../../components/map-grid';

import { db } from '../../data';

import './map.css';
import { Fragment } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

function Map () {
  let { id } = useParams();

  const mapData = useLiveQuery(async () => {
    return await db.maps.where({ id: +id }).first();
  });

  console.log({ mapData });

  return (
    <div className="map">
      {
      mapData ?
        <Fragment>
          <h3>{mapData.name} #{mapData.id}</h3>
          <MapGrid w={mapData.width} h={mapData.height} />
        </Fragment>
        :
        <h3>Loading...</h3>
      }
    </div>
  );
}

export default Map;