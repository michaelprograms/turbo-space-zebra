import { styled } from 'styled-components';
import { EditableText } from '@blueprintjs/core';

export const MapGridWrapper = styled.div`
  user-select: none;
  border-spacing: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  .map-grid-cell {
    width: 35px;
    height: 35px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #AAA;
    }
    &.focus {
      background-color: #999;
    }

    .cell-room {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      border: 2px solid #333;
      box-sizing: border-box;
    }
  }
`;

export const MapTitleText = styled(EditableText)`
  font-size: 24px;
`;

export const MapGridRow = styled.div`
  display: flex;
`;
