import { styled } from 'styled-components';
import { EditableText } from '@blueprintjs/core';

export const MapGridWrapper = styled.div`
  user-select: none;
  border-spacing: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;

export const MapTitleText = styled(EditableText)`
  font-size: 24px;
`;

export const MapGridRow = styled.div`
  display: flex;
`;

export const MapGridCell = styled.div`
  width: 35px;
  height: 35px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.$focused ? '#999' : 'transparent'};

  &:hover {
    background-color: #AAA;
  }
`;

export const MapGridRoom = styled.div`
  width: 19px;
  height: 19px;
  border-radius: ${props => props.$borderRadius ? props.$borderRadius : '0%'};
  border-width: 2px;
  border-style: ${props => props.$enabled ? 'solid' : 'none'};
  border-color: ${props => props.$borderColor ? props.$borderColor : 'transparent'};
  box-sizing: border-box;
`