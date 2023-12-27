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
    ></td>
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
                    x={x}
                    y={y}
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
  const { mapData } = { ...props };
  const { name, id, width, height, data } = { ...mapData };

  console.log('MapGrid', mapData);

  const [focusX, setFocusX] = useState(0);
  const [focusY, setFocusY] = useState(0);
  const [map, setMap] = useState(data);

  const handleOnClick = (event) =>  {
      const newX = event.target.getAttribute('x');
      const newY = event.target.getAttribute('y');
      const mapCopy = [ ...map ];
      delete mapCopy[focusX][focusY].focus;
      mapCopy[newX][newY].focus = true;
      setFocusX(newX);
      setFocusY(newY);
      setMap(mapCopy);
  };

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
        if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
          return;
        }
        const mapCopy = [ ...map ];
        event.preventDefault();
        delete mapCopy[focusX][focusY].focus;
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
