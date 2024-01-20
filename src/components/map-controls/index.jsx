import { useState } from 'react';
import { ButtonGroup, Button, Section, Slider, Switch } from '@blueprintjs/core';

import { MapControlWrapper, MapControlLabel } from './style.js';

function MapControls (props) {

  const handleSwitchEnable = (event) =>  {
    // @TODO adjust focusX, focusY enabled to event.target.checked
  };

  return (
    <MapControlWrapper>
      <Section>
        <Switch
          alignIndicator='right'
          labelElement='Enable Room'
          innerLabelChecked='on' innerLabel='off'
          onChange={e => handleSwitchEnable(e)}
        />
      </Section>
      <Section>
        <MapControlLabel>
          Border Width
          <Slider
            min={0}
            max={5}
            stepSize={1}
            labelStepSize={1}
            // onChange={n => setBorderWidth(n)}
            // value={borderWidth}
          />
        </MapControlLabel>
        <MapControlLabel>
          Border Radius
          <Slider
            min={0}
            max={50}
            stepSize={1}
            labelStepSize={10}
            // onChange={n => setBorderRadius(n)}
            // value={borderRadius}
          />
        </MapControlLabel>
      </Section>
      <Section>
        <MapControlLabel>Links</MapControlLabel>
        <br />
        <ButtonGroup>
          <Button icon='arrow-top-left' />
          <Button icon='arrow-up' />
          <Button icon='arrow-top-right' />
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <Button icon='arrow-left' />
          <Button icon='arrow-right' />
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <Button icon='arrow-bottom-left' />
          <Button icon='arrow-down' />
          <Button icon='arrow-bottom-right' />
        </ButtonGroup>
      </Section>
    </MapControlWrapper>
  );
}

export default MapControls;