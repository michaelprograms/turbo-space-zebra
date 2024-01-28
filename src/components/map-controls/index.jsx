import { useEffect, useState } from 'react';
import { Button, FormGroup, Popover, Section } from '@blueprintjs/core';
import { ChromePicker } from 'react-color';

import { MapControlWrapper, MapControlLabel, MapControlSlider, MapControlSwitch, MapButtonGroupExits } from './style.js';

function MapControls (props) {
  const {
    mapData = [],
    focusX = 0,
    focusY = 0,
    handleControlEnable,
    handleControlBorderRadius,
    handleControlBorderWidth,
    handleControlBorderColor,
    handleControlFillColor,
  } = { ...props };

  const [ enabled, setEnabled ] = useState(false);
  const [ borderRadius, setBorderRadius ] = useState(0);
  const [ borderWidth, setBorderWidth ] = useState(2);
  const [ borderColor, setBorderColor ] = useState('#666666');
  const [ fillColor, setFillColor ] = useState('#999999');

  useEffect(() => {
    const room = mapData?.[focusX]?.[focusY] || {};
    setEnabled(room.enabled !== undefined ? room.enabled : false);
    setBorderRadius(room.borderRadius !== undefined ? room.borderRadius : 50);
    setBorderWidth(room.borderWidth !== undefined ? room.borderWidth : 2);
    setBorderColor(room.borderColor !== undefined ? room.borderColor : '#666666');
    setFillColor(room.fillColor !== undefined ? room.fillColor : '#999999');

    console.log('Room focused', room);
  }, [ focusX, focusY, mapData ]);

  const borderColorPopover = () => {
    return (
      <Popover>
        <ChromePicker
          color={borderColor}
          onChange={e => handleControlBorderColor(e)}
        />
      </Popover>
    );
  };
  const fillColorPopover = () => {
    return (
      <Popover>
        <ChromePicker
          color={fillColor}
          onChange={e => handleControlFillColor(e)}
        />
      </Popover>
    );
  };

  return (
    <MapControlWrapper>
      <Section>
        <FormGroup
          label='Room'
        >
          <MapControlSwitch
            alignIndicator='right'
            labelElement='Enable'
            innerLabelChecked='on' innerLabel='off'
            checked={enabled}
            onChange={handleControlEnable}
          />
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
        </FormGroup>
      </Section>
      <Section>
        <FormGroup>
          <MapControlLabel>
            Border Width
            <MapControlSlider
              min={1}
              max={10}
              stepSize={1}
              labelStepSize={1}
              onChange={handleControlBorderWidth}
              value={borderWidth}
              disabled={!enabled}
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
              disabled={!enabled}
            />
          </MapControlLabel>
          <MapControlLabel>
            Border Color
            <Popover
              content={borderColorPopover()}
            >
              <Button
                text={borderColor}
                fill={true}
                disabled={!enabled}
              />
            </Popover>
          </MapControlLabel>
          <MapControlLabel>
            Fill Color
            <Popover
              content={fillColorPopover()}
            >
              <Button
                text={fillColor}
                fill={true}
                disabled={!enabled}
              />
            </Popover>
          </MapControlLabel>
        </FormGroup>
      </Section>
    </MapControlWrapper>
  );
}

export default MapControls;