import { Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
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
      newWindow.document.write(`<html><head><title>${mapData.name}</title></head><body>`);
      newWindow.document.write(`<img src="${base64image}" alt="${mapData.name}"/>`);
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
          <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading>Turbo Space Zebra</Navbar.Heading>
              <Navbar.Divider />
              <Button className="bp5-minimal" icon="floppy-disk" onClick={e => saveGrid(e)} text="Save" />
              <Button className="bp5-minimal" icon="print" onClick={e => printGrid(e)} text="Print" />
            </Navbar.Group>
          </Navbar>
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