import { Link } from 'react-router-dom';
import { Button, Card, CardList, Classes, Section } from '@blueprintjs/core';
import { db } from '../../data';
import { useLiveQuery } from 'dexie-react-hooks';

import './map-menu.css';

function PageMenu (props) {
  const mapsData = useLiveQuery(() => db.maps.toArray());

  const newMapOnClick = async () => {
    try {
      const id = await db.maps.add({
        name: 'Untitled Map',
        width: 25,
        height: 25,
        created: Date.now(),
        edited: Date.now(),
      });
      console.log('added id:', id);
    } catch (error) {
      setStatus(`Failed to add new map: ${error}`);
    }
  };

  return (
    <div className="map-menu">
      <div className="map-buttons">
        <Button text="Add new map" icon="add" intent="primary" onClick={newMapOnClick} />
      </div>
      <CardList className="maps">
      {mapsData?.map((map) => (
        <Link to={"/map/"+map.id} key={map.id}>
          <Card interactive={true} >
            <span>{map.name}, {map.width}x{map.height}</span>
          </Card>
        </Link>
      ))}
      </CardList>
    </div>
  );
}

export default PageMenu;