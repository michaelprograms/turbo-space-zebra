import { Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { Button } from '@blueprintjs/core';
import html2canvas from 'html2canvas';

import MapGrid from '../../components/map-grid';
import { db } from '../../data';

import './map.css';

function Map () {
  let { id } = useParams();

  const mapData = useLiveQuery(async () => {
    return await db.maps.where({ id: +id }).first();
  }, [id]);

  console.log('Loading Map', mapData);

  const gridRef = useRef(null);
  const printGrid = async (event) => {
    html2canvas(gridRef.current).then((canvas) => {
      const base64image = canvas.toDataURL('image/png');
      const newWindow = window.open();
      newWindow.document.write('<html><head><title>Map Image</title></head><body>');
      newWindow.document.write('<img src="' + base64image + '" alt="Preview"/>');
      newWindow.document.write('</body></html>');
    });
  };

  const saveGrid = async (event) => {
    try {
      await db.maps.where('id').equals(+id).modify(mapData);
      console.log('updated map');

    } catch (error) {
      console.log(`Failed to update map: ${error}`);
    }
  };

  return (
    <div className="map">
      {
      mapData ?
        <Fragment>
          <div>
            <Button icon="floppy-disk" onClick={e => saveGrid(e)}>Save</Button>
            <Button icon="print" onClick={e => printGrid(e)}>Print</Button>
          </div>
          <MapGrid
            mapData={mapData}
            ref={gridRef}
          />
        </Fragment>
        :
        <h3>Loading...</h3>
      }
    </div>
  );
}

export default Map;