import { useEffect, useState } from 'react';
import { Card, CardList, Classes, Section } from "@blueprintjs/core";
import { ChevronRight } from "@blueprintjs/icons";
import { v4 as uuidv4 } from 'uuid';

import './Menu.css';

function PageMenu (props) {    

  const storedMapsRaw = JSON.parse(localStorage.getItem('maps')) || [];
  let storedMaps = [ ...storedMapsRaw ];
  if (storedMaps.length <= 10) {
    storedMaps.push({
      name: 'Add new map',
      type: 'new',
    });
  }
  const [ maps, setMaps ] = useState(storedMaps);

  useEffect(() => {
    const mapsToSave = maps.filter(map => map.type !== 'new');
    localStorage.setItem('maps', JSON.stringify(mapsToSave));
  }, [ maps ]);

  const loadOrNewMapOnClick = (event, map) => {
    event.preventDefault();
    
    let mapsCopy = [ ...maps ];
    if (map.type === 'new') {
      if (mapsCopy.length <= 10) {
        mapsCopy.splice(mapsCopy.length - 1, 0, {
          name: 'Untitled map ' + (mapsCopy.length),
          id: uuidv4(),
        });
      }
      if (mapsCopy.length > 11) {
        mapsCopy = mapsCopy.slice(0, 11);
      }
      console.log('NEW', map);
    } else {
      console.log('OPEN', map);
    }
    setMaps(mapsCopy);
  }

  return (
    <div className="page-menu">
      <CardList className="maps">
      {maps.map((map,x) => {
          return (
            <Card
              key={"map-"+x}
              onClick={e => loadOrNewMapOnClick(e, map)}
              interactive={true}
            >
              <span>{map.name}</span>
              <ChevronRight className={Classes.TEXT_MUTED} />
            </Card>
          );
      })}
      </CardList>
    </div>
  );
}

export default PageMenu;