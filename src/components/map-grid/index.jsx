import { forwardRef, useEffect, useState } from 'react';
import { EditableText } from '@blueprintjs/core';

import './map-grid.css';

function MapGridTableCell (props) {
  const { x, y, focus } = { ...props };

  return (
    <div
      className={`map-grid-cell ${focus ? "focus" : ""}`}
      onClick={e => props.handleOnClick(e)}
      x={x}
      y={y}
    >
      <div className="cell-room"></div>
    </div>
  );
}

const MapGrid = forwardRef(function MapGrid (props, ref) {
  const { mapData } = { ...props };
  const { name, id, width, height, data } = { ...mapData };

  // find initial saved focus
  let focusXInitial = 0, focusYInitial = 0;
  for (let x = 0; x < data.length; x ++) {
    for (let y = 0; y < data[x].length; y ++) {
      if(data[x][y].focus) {
        focusXInitial = x;
        focusYInitial = y;
      }
    }
  }
  const [focusX, setFocusX] = useState(focusXInitial);
  const [focusY, setFocusY] = useState(focusYInitial);
  const [map, setMap] = useState(data);

  const confirmEditTitle = async (text) => {
    mapData.name = text;
  };
  
  const handleOnClick = (event) =>  {
    const newX = event.currentTarget.getAttribute('x');
    const newY = event.currentTarget.getAttribute('y');
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
  
  return (
    <div className="map-grid-wrapper">
      <div className="map-grid-controls">
        <div>Border Width</div>
        <div>Border Color</div>
        <div>Border Radius</div>
        <div>Cell Width</div>
        <div>Cell Color</div>
        <div>NW  N  NE</div>
        <div>W      E</div>
        <div>SW  S  SE</div>
      </div>
      <div className="map-grid" ref={ref} >
        <EditableText
          className="map-title"
          maxLength="64"
          onConfirm={(e) => confirmEditTitle(e)}
          defaultValue={name}
        />
        {map.map((row,x) => {
          return (
            <div className="map-grid-row" key={"row-"+x}>
              {row.map((item,y) => {
                return (
                  <MapGridTableCell
                    key={x+"-"+y}
                    x={x}
                    y={y}
                    focus={item.focus}
                    handleOnClick={e => handleOnClick(e)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default MapGrid;
