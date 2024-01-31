import { useEffect, useState } from 'react';
import { Button, FormGroup, Popover, Section } from '@blueprintjs/core';
import { ChromePicker } from 'react-color';

import {
  MapControlWrapper,
  MapControlLabel,
  MapControlSlider,
  MapButtonGroupExits,
  MapControlButtonExit,
  MapRoomSymbol
} from './style.js';

function MapControls (props) {
  const {
    mapData = [],
    focusX = 0,
    focusY = 0,
    handleControlRoomValue,
    handleControlRoomToggle,
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

  let room = mapData?.[focusX]?.[focusY] || {};
  useEffect(() => {
    room = mapData?.[focusX]?.[focusY] || {};

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
          onChange={e => handleControlRoomValue('borderColor', e.hex)}
        />
      </Popover>
    );
  };
  const fillColorPopover = () => {
    return (
      <Popover>
        <ChromePicker
          color={fillColor}
          onChange={e => handleControlRoomValue('fillColor', e.hex)}
        />
      </Popover>
    );
  };

  return (
    <MapControlWrapper>
      <Section>
        <MapControlLabel>Room and Links</MapControlLabel>
        <MapButtonGroupExits>
          <MapControlButtonExit
            intent={exitNorthwest ? 'primary' : null} icon='arrow-top-left'
            onClick={e => handleControlRoomToggle('northwestEnabled')}
          />
          <MapControlButtonExit
            intent={exitNorth ? 'primary' : null} icon='arrow-up'
            onClick={e => handleControlRoomToggle('northEnabled')}
          />
          <MapControlButtonExit
            intent={exitNortheast ? 'primary' : null} icon='arrow-top-right'
            onClick={e => handleControlRoomToggle('northeastEnabled')}
          />
          <MapControlButtonExit
            intent={exitWest ? 'primary' : null} icon='arrow-left'
            onClick={e => handleControlRoomToggle('westEnabled')}
          />
          <MapControlButtonExit
            intent={room?.enabled ? 'primary' : null}
            onClick={e => handleControlRoomToggle('enabled')}
          >
            <MapRoomSymbol
              $fillColor={room?.fillColor}
              $borderColor={room?.borderColor}
              $borderRadius={room?.borderRadius}
              $borderWidth={room?.borderWidth}
            />
          </MapControlButtonExit>
          <MapControlButtonExit
            intent={exitEast ? 'primary' : null} icon='arrow-right'
            onClick={e => handleControlRoomToggle('eastEnabled')}
          />
          <MapControlButtonExit
            intent={exitSouthwest ? 'primary' : null} icon='arrow-bottom-left'
            onClick={e => handleControlRoomToggle('southwestEnabled')}
          />
          <MapControlButtonExit
            intent={exitSouth ? 'primary' : null} icon='arrow-down'
            onClick={e => handleControlRoomToggle('southEnabled')}
          />
          <MapControlButtonExit
            intent={exitSoutheast ? 'primary' : null} icon='arrow-bottom-right'
            onClick={e => handleControlRoomToggle('southeastEnabled')}
          />
        </MapButtonGroupExits>
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
              onChange={e => handleControlRoomValue('borderWidth', e)}
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
              onChange={e => handleControlRoomValue('borderRadius', e)}
              value={borderRadius}
              disabled={!enabled}
            />
          </MapControlLabel>
          <MapControlLabel>
            Border Color
            <Popover
              content={borderColorPopover()}
              placement='top'
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
              placement='top'
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