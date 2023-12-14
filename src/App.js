import { Alignment, Button, Navbar } from "@blueprintjs/core";

import PageMap from './page/Map.js';
import PageMenu from './page/Menu.js';

import './App.css';

function App () {
  return (
    <div className="App">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Turbo Space Zebra</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp5-minimal" icon="home" text="Home" />
          <Button className="bp5-minimal" icon="document" text="Files" />
        </Navbar.Group>
      </Navbar>

      <PageMenu />
      <PageMap />
    </div>
  );
}

export default App;