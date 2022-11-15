import './MapGrid.css';

function MapGridItem (props) {
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

function MapGrid (props) {
  const { map } = { ...props };

  return (
    <table className="map-grid">
      <tbody>
        {map.map((row,x) => {
          return (
            <tr key={"row-"+x}>
              {row.map((item,y) => {
                return (
                  <MapGridItem
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

export default MapGrid;
