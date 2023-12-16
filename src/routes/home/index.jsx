import { Alignment, Button, Navbar } from "@blueprintjs/core";

import MapMenu from '../../components/map-menu';

import './home.css';

function Home () {
  return (
    <div className="home">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Turbo Space Zebra</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp5-minimal" icon="home" text="Home" />
          <Button className="bp5-minimal" icon="document" text="Files" />
        </Navbar.Group>
      </Navbar>

      <MapMenu />
    </div>
  );
}

export default Home;