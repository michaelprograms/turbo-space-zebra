import { useParams } from 'react-router-dom';

import MapGrid from '../../components/map-grid';

import './map.css';

function Map () {
  let { id } = useParams();

  return (
    <div className="map">
      <h3>ID: {id}</h3>
      <MapGrid />
    </div>
  );
}

export default Map;