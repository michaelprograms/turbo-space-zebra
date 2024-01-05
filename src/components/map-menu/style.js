import { styled } from 'styled-components';
import { CardList } from '@blueprintjs/core';

export const MapMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

export const MapMenuCardList = styled(CardList)`
  width: 75%;
  min-width: 500px;
  margin: 0 auto;
`;

export const MapMenuButtons = styled.div`
  width: 75%;
  min-width: 500px;
  margin: 0 auto;
  text-align: right;
`;