import { Fragment, useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import html2canvas from 'html2canvas';

import MapGrid from '../../components/map-grid';
import MapControls from '../../components/map-controls';
import { db } from '../../data';

import { MapWrapper } from './style.js';

function Map () {
  let { id } = useParams();

  const result = useLiveQuery(async () => {
    const dbMap = await db.maps.where({ id: +id }).first();;
    console.info('Loading Map', dbMap);
    return dbMap;
  }, [ id ]);

  const { name, width, height, focusX, focusY, data = [] } = { ...result };
  const [mapFocusX, setMapFocusX] = useState(focusX);
  const [mapFocusY, setMapFocusY] = useState(focusY);
  const [mapData, setMapData] = useState(data);

  // map data
  useEffect(() => {
    const isSameMapData = mapData.length === data.length && mapData.every((o, i) => Object.keys(o).length === Object.keys(data[i]).length && Object.keys(o).every(k => o[k] === data[i][k]));

    if (!isSameMapData) {
      setMapData(data);
      setMapFocusX(focusX);
      setMapFocusY(focusY);
    }
  }, [ data ]);

  const enableRoom = (x, y, value) => {
    const mapCopy = [ ...mapData ];

    mapCopy[mapFocusX][mapFocusY].enabled = value !== undefined ? value : !mapCopy[mapFocusX][mapFocusY].enabled;

    if (mapCopy[mapFocusX][mapFocusY].borderRadius === undefined) {
      mapCopy[mapFocusX][mapFocusY].borderRadius = 50;
    }
    if (mapCopy[mapFocusX][mapFocusY].borderWidth === undefined) {
      mapCopy[mapFocusX][mapFocusY].borderWidth = 3;
    }
    if (mapCopy[mapFocusX][mapFocusY].borderColor === undefined) {
      mapCopy[mapFocusX][mapFocusY].borderColor = '#666666';
    }
    if (mapCopy[mapFocusX][mapFocusY].fillColor === undefined) {
      mapCopy[mapFocusX][mapFocusY].fillColor = '#999999';
    }

    const dirs = [
      'north',
      'northeast',
      'east',
      'southeast',
      'south',
      'southwest',
      'west',
      'northwest',
    ];
    for (let i = 0; i < dirs.length; i ++) {
      if (mapCopy[mapFocusX][mapFocusY][dirs[i] + 'Enabled'] === undefined) {
        mapCopy[mapFocusX][mapFocusY][dirs[i] + 'Enabled'] = false;
      }
      if (mapCopy[mapFocusX][mapFocusY][dirs[i] + 'Width'] === undefined) {
        mapCopy[mapFocusX][mapFocusY][dirs[i] + 'Width'] = '#999999';
      }
      if (mapCopy[mapFocusX][mapFocusY][dirs[i] + 'Color'] === undefined) {
        mapCopy[mapFocusX][mapFocusY][dirs[i] + 'Color'] = '#666666';
      }
    }

    return mapCopy;
  };

  // keyboard inputs
  useEffect(() => {
    const handleKeyDown = (event) => {
      let newX = mapFocusX, newY = mapFocusY;
      let dir;
      switch (event.key) {
        case 'End': case '1':
          dir = 'SW';
          newX ++;
          newY --;
          break;
        case 'ArrowDown': case '2':
          dir = 'S';
          newX ++;
          break;
        case 'PageDown': case '3':
          dir = 'SE';
          newX ++;
          newY ++;
          break;
        case 'ArrowLeft': case '4':
          dir = 'W';
          newY --;
          break;
        case 'Clear': case '5':
          dir = '5';
          break;
        case 'ArrowRight': case '6':
          dir = 'E';
          newY ++;
          break;
        case 'Home': case '7':
          dir = 'NW';
          newX --;
          newY --;
          break;
        case 'ArrowUp': case '8':
          dir = 'N';
          newX --;
          break;
        case 'PageUp': case '9':
          dir = 'NE';
          newX --;
          newY ++;
          break;
        case ' ':
          event.preventDefault();
          const mapCopy = enableRoom(mapFocusX, mapFocusY);
          setMapData(mapCopy);
          break;
        default:
          break;
      }
      if (dir) {
        if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
          return;
        }
        event.preventDefault();
        setMapFocusX(newX);
        setMapFocusY(newY);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [ mapFocusX, mapFocusY, mapData ]);

  const handleGridOnClick = (event) => {
    const newX = event.currentTarget.getAttribute('x');
    const newY = event.currentTarget.getAttribute('y');
    setMapFocusX(+newX);
    setMapFocusY(+newY);
  };

  // map controls
  const handleControlEnable = async (event) => {
    event.stopPropagation();
    const mapCopy = enableRoom(mapFocusX, mapFocusY, event.target.checked);
    setMapData(mapCopy);
  };
  const handleControlBorderRadius = async (event) => {
    const mapCopy = [ ...mapData ];
    mapCopy[mapFocusX][mapFocusY].borderRadius = event;
    setMapData(mapCopy);
  };
  const handleControlBorderWidth = async (event) => {
    const mapCopy = [ ...mapData ];
    mapCopy[mapFocusX][mapFocusY].borderWidth = event;
    setMapData(mapCopy);
  };

  // Print button
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

  // Save button
  const saveMapData = async (event) => {
    try {
      let newData = {
        ...result,
        focusX: mapFocusX,
        focusY: mapFocusY,
      };
      await db.maps.where('id').equals(+id).modify(newData);
      console.info('Saved map', newData);
    } catch (error) {
      console.log(`Failed to save map: ${error}`);
    }
  };

  return (
    <Fragment>
      { result ?
        <Fragment>
          <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading>Turbo Space Zebra</Navbar.Heading>
              <Navbar.Divider />
              <Button className="bp5-minimal" icon="floppy-disk" onClick={saveMapData} text="Save" />
              <Button className="bp5-minimal" icon="print" onClick={e => printGrid(e)} text="Print" />
            </Navbar.Group>
          </Navbar>
          <MapWrapper>
            <MapControls
              mapData={mapData}
              focusX={mapFocusX}
              focusY={mapFocusY}
              handleControlEnable={handleControlEnable}
              handleControlBorderRadius={handleControlBorderRadius}
              handleControlBorderWidth={handleControlBorderWidth}
            />
            <MapGrid
              mapData={mapData}
              mapName={name}
              focusX={mapFocusX}
              focusY={mapFocusY}
              ref={gridRef}
              handleGridOnClick={handleGridOnClick}
            />
          </MapWrapper>
        </Fragment>
        :
        <h3>Loading...</h3>
      }
    </Fragment>
  );
}

export default Map;