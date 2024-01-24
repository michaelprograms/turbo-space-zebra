import { useEffect, useState } from 'react';
import { Button, Section } from '@blueprintjs/core';

import { MapControlWrapper, MapControlLabel, MapControlSlider, MapControlSwitch, MapButtonGroupExits } from './style.js';

function MapControls (props) {
  const {
    mapData = [],
    focusX = 0,
    focusY = 0,
    handleControlEnable,
    handleControlBorderRadius,
    handleControlBorderWidth,
  } = { ...props };

  const [ roomData, setRoomData ] = useState({ });
  const [ enabled, setEnabled ] = useState(false);
  const [ borderRadius, setBorderRadius ] = useState(0);
  const [ borderWidth, setBorderWidth ] = useState(2);
  // @TODO borderColor control
  // const [ borderColor, setBorderColor ] = useState('#999');

  useEffect(() => {
    const room = mapData?.[focusX]?.[focusY] || {};

    setRoomData(room);
    setEnabled(room.enabled !== undefined ? room.enabled : false);
    setBorderRadius(room.borderRadius !== undefined ? room.borderRadius : 50);
    setBorderWidth(room.borderWidth !== undefined ? room.borderWidth : 2);

    console.log('Room focused', room);
  }, [ focusX, focusY, mapData ]);

  return (
    <MapControlWrapper>
      <Section>
        <MapControlSwitch
          alignIndicator='right'
          labelElement='Enable Room'
          innerLabelChecked='on' innerLabel='off'
          checked={enabled}
          onChange={handleControlEnable}
        />
        <MapControlLabel>
          Border Width
          <MapControlSlider
            min={1}
            max={10}
            stepSize={1}
            labelStepSize={1}
            onChange={handleControlBorderWidth}
            value={borderWidth}
          />
        </MapControlLabel>
        <MapControlLabel>
          Border Radius
          <MapControlSlider
            min={0}
            max={50}
            stepSize={1}
            labelStepSize={10}
            onChange={handleControlBorderRadius}
            value={borderRadius}
          />
        </MapControlLabel>
      </Section>
      <Section>
        <MapControlLabel>Links</MapControlLabel>
          <MapButtonGroupExits>
            <Button icon='arrow-top-left' />
            <Button icon='arrow-up' />
            <Button icon='arrow-top-right' />
            <Button icon='arrow-left' />
            <Button disabled={true} />
            <Button icon='arrow-right' />
            <Button icon='arrow-bottom-left' />
            <Button icon='arrow-down' />
            <Button icon='arrow-bottom-right' />
          </MapButtonGroupExits>
      </Section>
    </MapControlWrapper>
  );
}

export default MapControls;