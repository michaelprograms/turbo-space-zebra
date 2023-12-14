import { useEffect, useState } from 'react';

import './App.css';

import MapHeader from './components/MapHeader';
import MapGrid from './components/MapGrid';

const WIDTH = 10, HEIGHT = 10;

function App () {
  const [focusX, setFocusX] = useState(0);
  const [focusY, setFocusY] = useState(0);
  const [map, setMap] = useState([ ]);

  if (map.length < WIDTH) {
    for (let x = 0; x < WIDTH; x ++) {
      if (map.length < WIDTH) {
        map.push([ ]);
      }
      for (let y = 0; y < HEIGHT; y ++) {
        if (map.length < WIDTH) {
          map[x].push([ ]);
        }
        map[x][y] = {
          x: x,
          y: y,
          focus: focusX === x && focusY === y,
        };
      }
    }
  }

  const handleOnClick = (event) =>  {
    const newX = event.target.getAttribute('x');
    const newY = event.target.getAttribute('y');
    const mapCopy = [ ...map ];
    mapCopy[focusX][focusY].focus = false;
    mapCopy[newX][newY].focus = true;
    setFocusX(newX);
    setFocusY(newY);
    setMap(mapCopy);
    // document.getElementById('debug').innerHTML += '<div>CLICK found state focus: ' + focusX + ',' + focusY + ', change to ' + newX + ',' + newY + '</div>';
  }
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      let dir;
      let newX = focusX, newY = focusY;
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
        default:
          
      }
      if (dir) {
        if (newX < 0 || newX >= WIDTH || newY < 0 || newY >= HEIGHT) {
          return;
        }
        const mapCopy = [ ...map ];
        event.preventDefault();
        mapCopy[focusX][focusY].focus = false;
        mapCopy[newX][newY].focus = true;
        setFocusX(newX);
        setFocusY(newY);
        setMap(mapCopy);
        // console.log('INPUT: dir = ' + dir);
        // document.getElementById('debug').innerHTML += '<div>KEYPRESS ' + event.key + ' found state focus: ' + focusX + ',' + focusY + ', change to ' + newX + ',' + newY + '</div>';
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [focusX, focusY, map]);

  return (
    <div className="App">
      <MapHeader
        focusX={focusX}
        focusY={focusY}
        />
      <MapGrid
        map={map}
        handleOnClick={(e) => handleOnClick(e)}
      />
    </div>
  );
}

export default App;
