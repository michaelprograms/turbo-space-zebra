import { useEffect, useState } from 'react';

import './map-grid.css';

function MapGridTableCell (props) {
  const { x, y, focus } = { ...props };

  return (
    <td
      className={`${focus ? "focus" : ""}`}
      onClick={e => props.handleOnClick(e)}
      x={x}
      y={y}
    >
      {x},{y}
    </td>
  );
}

function MapGridTable (props) {
  const { map } = { ...props };

  return (
    <table className="map-grid">
      <tbody>
        {map.map((row,x) => {
          return (
            <tr key={"row-"+x}>
              {row.map((item,y) => {
                return (
                  <MapGridTableCell
                    key={x+"-"+y}
                    x={item.x}
                    y={item.y}
                    focus={item.focus}
                    handleOnClick={e => props.handleOnClick(e)}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function MapGrid (props) {
  const { w, h } = { ...props };

  const [focusX, setFocusX] = useState(0);
  const [focusY, setFocusY] = useState(0);
  const [map, setMap] = useState([ ]);
  
  if (map.length < w) {
    for (let x = 0; x < w; x ++) {
      if (map.length < w) {
        map.push([ ]);
      }
      for (let y = 0; y < h; y ++) {
        if (map.length < w) {
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
          break;
      }
      if (dir) {
        if (newX < 0 || newX >= w || newY < 0 || newY >= h) {
          return;
        }
        const mapCopy = [ ...map ];
        event.preventDefault();
        mapCopy[focusX][focusY].focus = false;
        mapCopy[newX][newY].focus = true;
        setFocusX(newX);
        setFocusY(newY);
        setMap(mapCopy);
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [focusX, focusY, map]);
  
  /* focusX={focusX} focusY={focusY} */
  
  return (
    <MapGridTable
      map={map}
      handleOnClick={(e) => handleOnClick(e)}
    />
  );
}

export default MapGrid;
