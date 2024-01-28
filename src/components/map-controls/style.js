import { styled } from 'styled-components';
import { ButtonGroup, Label, Slider, Switch } from '@blueprintjs/core';

export const MapControlWrapper = styled.div`
  width: 250px;
  min-width: 250px;
`;

export const MapControlLabel = styled(Label)`
  width: 90%;
  margin: 10px auto;
`;

export const MapControlSlider = styled(Slider)`
  width: 90%;
  margin: 10px auto;
`;

export const MapControlSwitch = styled(Switch)`
  width: 90%;
  margin: 10px auto;
`;

export const MapButtonGroupExits = styled(ButtonGroup)`
  display: flex;
  flex-wrap: wrap;
  width: 100px;
  margin: 0 auto 10px auto;
`;