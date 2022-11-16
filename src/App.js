import { useEffect, useState } from 'react';

import './App.css';

import MapHeader from './MapHeader';
import MapGrid from './MapGrid';

const WIDTH = 5, HEIGHT = 5;

function App() {
  const [focusX, setFocusX] = useState(0);
  const [focusY, setFocusY] = useState(0);
  const [map, setMap] = useState([]);

  if (map.length < WIDTH) {
    for (let x = 0; x < WIDTH; x ++) {
      if (map.length < WIDTH) {
        map.push([]);
      }
      for (let y = 0; y < HEIGHT; y ++) {
        if (map.length < WIDTH) {
          map[x].push([]);
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
  }
  
  const handleKeyDown = (event) => {
    event.preventDefault();

    switch (event.key) {
      case 'End': case '1':
        console.log('INPUT: southwest');
        break;
      case 'ArrowDown': case '2':
        console.log('INPUT: south');
        break;
      case 'PageDown': case '3':
        console.log('INPUT: southeast');
        break;
      case 'ArrowLeft': case '4':
        console.log('INPUT: west');
        break;
      case 'Clear': case '5':
        console.log('INPUT: FIVE');
        break;
      case 'ArrowRight': case '6':
        console.log('INPUT: east');
        break;
      case 'Home': case '7':
        console.log('INPUT: northwest');
        break;
      case 'ArrowUp': case '8':
        console.log('INPUT: north');
        break;
      case 'PageUp': case '9':
        console.log('INPUT: northeast');
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

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
