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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.$focused ? '#CCC' : 'transparent'};

  &:hover {
    background-color: #AAA;
  }
`;