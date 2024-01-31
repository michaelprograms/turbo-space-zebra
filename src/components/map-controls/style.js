import { styled } from 'styled-components';
import { Button, ButtonGroup, Label, Slider } from '@blueprintjs/core';

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

export const MapButtonGroupExits = styled(ButtonGroup)`
  display: flex;
  flex-wrap: wrap;
  width: 105px;
  margin: 0 auto 10px auto;
`;

export const MapControlButtonExit = styled(Button)`
  width: 35px;
  height: 35px;
`;

export const MapRoomSymbol = styled.div`
  width: 19px;
  height: 19px;
  box-sizing: border-box;

  border-style: solid;
  background-color: ${props => props.$fillColor !== undefined ? props.$fillColor : '#999999' };
  border-radius: ${props => props.$borderRadius !== undefined ? props.$borderRadius + '%' : '50%'};
  border-width: ${props => props.$borderWidth !== undefined ? props.$borderWidth + 'px' : '2px'};
  border-color: ${props => props.$borderColor !== undefined ? props.$borderColor : '#666666'};
`;