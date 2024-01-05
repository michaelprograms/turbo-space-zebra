import { Link } from 'react-router-dom';
import { Button, Card } from '@blueprintjs/core';
import { useLiveQuery } from 'dexie-react-hooks';

import { MapMenu, MapMenuCardList, MapMenuButtons } from './style.js';
import { db } from '../../data';

function PageMenu () {
  const mapsData = useLiveQuery(() => db.maps.toArray());

  const newMapOnClick = async () => {
    try {
      const data = [];
      for (let i = 0; i < 25; i ++) {
        data.push([]);
        for (let j = 0; j < 25; j ++) {
          data[i].push({});
        }
      }
      data[0][0].focus = true;

      const id = await db.maps.add({
        name: 'Untitled Map',
        width: 25,
        height: 25,
        created: Date.now(),
        edited: Date.now(),
        data: data,
      });
      console.log('added map id:', id);

    } catch (error) {
      console.log(`Failed to add new map: ${error}`);
    }
  };

  return (
    <MapMenu>
      <MapMenuButtons>
        <Button text="Add new map" icon="add" intent="primary" onClick={newMapOnClick} />
      </MapMenuButtons>
      <MapMenuCardList>
        {mapsData?.map((map) => (
          <Link to={"/map/"+map.id} key={map.id}>
            <Card interactive={true} >
              <span>{map.name}, {map.width}x{map.height}</span>
            </Card>
          </Link>
        ))}
      </MapMenuCardList>
    </MapMenu>
  );
}

export default PageMenu;