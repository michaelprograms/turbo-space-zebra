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
    handleControlExit,
  } = { ...props };

  const [ enabled, setEnabled ] = useState(false);
  const [ borderRadius, setBorderRadius ] = useState(0);
  const [ borderWidth, setBorderWidth ] = useState(2);
  const [ borderColor, setBorderColor ] = useState('#666666');
  const [ fillColor, setFillColor ] = useState('#999999');
  const [ exitNorth, setExitNorth ] = useState(false);
  const [ exitNortheast, setExitNortheast ] = useState(false);
  const [ exitEast, setExitEast ] = useState(false);
  const [ exitSoutheast, setExitSoutheast ] = useState(false);
  const [ exitSouth, setExitSouth ] = useState(false);
  const [ exitSouthwest, setExitSouthwest ] = useState(false);
  const [ exitWest, setExitWest ] = useState(false);
  const [ exitNorthwest, setExitNorthwest ] = useState(false);

  useEffect(() => {
    const room = mapData?.[focusX]?.[focusY] || {};

    setEnabled(room.enabled !== undefined ? room.enabled : false);
    setExitNorth(room.northEnabled !== undefined ? room.northEnabled : false);
    setExitNortheast(room.northeastEnabled !== undefined ? room.northeastEnabled : false);
    setExitEast(room.eastEnabled !== undefined ? room.eastEnabled : false);
    setExitSoutheast(room.southeastEnabled !== undefined ? room.southeastEnabled : false);
    setExitSouth(room.southEnabled !== undefined ? room.southEnabled : false);
    setExitSouthwest(room.southwestEnabled !== undefined ? room.southwestEnabled : false);
    setExitWest(room.westEnabled !== undefined ? room.westEnabled : false);
    setExitNorthwest(room.northwestEnabled !== undefined ? room.northwestEnabled : false);

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
            <Button
              intent={exitNorthwest ? 'primary' : null} icon='arrow-top-left'
              onClick={e => handleControlExit(e, 'northwest')}
            />
            <Button
              intent={exitNorth ? 'primary' : null} icon='arrow-up'
              onClick={e => handleControlExit(e, 'north')}
            />
            <Button
              intent={exitNortheast ? 'primary' : null} icon='arrow-top-right'
              onClick={e => handleControlExit(e, 'northeast')}
            />
            <Button
              intent={exitWest ? 'primary' : null} icon='arrow-left'
              onClick={e => handleControlExit(e, 'west')}
            />
            <Button
              disabled={true}
            />
            <Button
              intent={exitEast ? 'primary' : null} icon='arrow-right'
              onClick={e => handleControlExit(e, 'east')}
            />
            <Button
              intent={exitSouthwest ? 'primary' : null} icon='arrow-bottom-left'
              onClick={e => handleControlExit(e, 'southwest')}
            />
            <Button
              intent={exitSouth ? 'primary' : null} icon='arrow-down'
              onClick={e => handleControlExit(e, 'south')}
            />
            <Button
              intent={exitSoutheast ? 'primary' : null} icon='arrow-bottom-right'
              onClick={e => handleControlExit(e, 'southeast')}
            />
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