import { Alignment, Button, Navbar } from "@blueprintjs/core";

import MapGrid from '../../components/map-grid';

import './map.css';

function Map () {
  return (
    <div className="map">
      <MapGrid />
    </div>
  );
}

export default Map;