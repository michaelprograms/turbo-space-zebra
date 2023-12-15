import { useEffect, useState } from 'react';
import { Card, CardList, Classes } from "@blueprintjs/core";
import { ChevronRight } from "@blueprintjs/icons";

import './Menu.css';

function PageMenu (props) {    

  const storedMapsRaw = JSON.parse(localStorage.getItem('maps')) || [];
  let storedMaps = [ ...storedMapsRaw ];
  if (storedMaps.length < 10) {
    storedMaps.push({ name: 'Add new map', type: 'new' });
  }
  const [ maps, setMaps ] = useState(storedMaps);

  useEffect(() => {
    const mapsToSave = maps.filter(map => map.type !== 'new');
    localStorage.setItem('maps', JSON.stringify(mapsToSave));
  }, [ maps ]);

  const handleOnClick = (event) => {
    event.preventDefault();
    let mapsCopy = [ ...maps ];
    mapsCopy.splice(mapsCopy.length - 1, 0, {
      name: 'Untitled map ' + (mapsCopy.length),
    });
    if (mapsCopy.length > 10) {
      mapsCopy = mapsCopy.slice(0, 10);
    }
    setMaps(mapsCopy);
  }

  return (
    <div className="page-menu">
      <CardList>
      {maps.map((map,x) => {
          return (
            <Card key={"map-"+x} onClick={e => handleOnClick(e)}>
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