import './MapHeader.css';

function MapHeader (props) {
  const { focusX, focusY } = { ...props };

  return (
    <header className="map-header">
        <div>
          Header
        </div>
        <div>
          Focus: {focusX},{focusY}
        </div>
      </header>
  );
}

export default MapHeader;
