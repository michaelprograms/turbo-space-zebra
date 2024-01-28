import { styled } from 'styled-components';

export const MapGridRoomWrapper = styled.div`
  width: 35px;
  height: 35px;
  position: relative;

  .line {
    position: absolute;
    background-color: #000;
  }
  .line-northwest-wrapper {
    width: 50%;
    height: 50%;
    position: absolute;

    .line-northwest {
      width: 27px;
      height: 3px;
      top: -2px;
      left: 0;
      transform-origin: top left;
      transform: rotate(45deg);
    }
  }
  .line-northeast-wrapper {
    width: 50%;
    height: 50%;
    position: absolute;
    right: 0;

    .line-northeast {
      width: 27px;
      height: 3px;
      top: -2px;
      right: 0;
      transform-origin: top right;
      transform: rotate(-45deg);
    }
  }
  .line-southwest-wrapper {
    width: 50%;
    height: 50%;
    position: absolute;
    bottom: 0px;

    .line-southwest {
      width: 27px;
      height: 3px;
      bottom: -2px;
      left: 0;
      transform-origin: bottom left;
      transform: rotate(-45deg);
    }
  }
  .line-southeast-wrapper {
    width: 50%;
    height: 50%;
    position: absolute;
    right: 0;
    bottom: 0px;

    .line-southeast {
      width: 27px;
      height: 3px;
      bottom: -2px;
      right: 0;
      transform-origin: bottom right;
      transform: rotate(45deg);
    }
  }

  .line-north {
    width: 3px;
    height: 18px;
    top: 0px;
    left: 50%;
    transform-origin: top;
    transform: translateX(-50%);
  }
  .line-south {
    width: 3px;
    height: 18px;
    bottom: 0;
    left: 50%;
    transform-origin: bottom;
    transform: translateX(-50%);
  }
  .line-west {
    width: 18px;
    height: 3px;
    top: 50%;
    left: 0;
    transform-origin: left;
    transform: translateY(-50%);
  }
  .line-east {
    width: 18px;
    height: 3px;
    top: 50%;
    right: 0;
    transform-origin: right;
    transform: translateY(-50%);
  }
`;

export const RoomCircle = styled.div`
  width: 19px;
  height: 19px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);

  border-style: solid;
  background-color: ${props => props.$fillColor !== undefined ? props.$fillColor : '' };
  border-radius: ${props => props.$borderRadius !== undefined ? props.$borderRadius + '%' : '50%'};
  border-width: ${props => props.$borderWidth !== undefined ? props.$borderWidth + 'px' : '2px'};
  border-color: ${props => props.$borderColor !== undefined ? props.$borderColor : 'transparent'};
`;