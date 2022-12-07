import styled from 'styled-components'
import { pxToRem } from 'utils'

export const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: -50%;
  height: calc(100vh - 228px);

  @media (min-width: ${pxToRem(500)}) {
    position: absolute;
    top: ${pxToRem(112)};
    left: ${pxToRem(100)};
    width: ${pxToRem(498)};
    height: ${pxToRem(400)};
  } ;
`

export const Overlay = styled.div`
  border-top: solid 175px rgba(70, 78, 102, 0.7);
  border-bottom: solid 175px rgba(70, 78, 102, 0.7);
  border-left: solid 65px rgba(70, 78, 102, 0.7);
  border-right: solid 65px rgba(70, 78, 102, 0.7);

  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 228px);

  @media (min-width: ${pxToRem(500)}) {
    border-top: solid 84px rgba(70, 78, 102, 0.7);
    border-bottom: solid 84px rgba(70, 78, 102, 0.7);
    border-left: solid 84px rgba(70, 78, 102, 0.7);
    border-right: solid 84px rgba(70, 78, 102, 0.7);

    position: absolute;
    top: ${pxToRem(126)};
    left: ${pxToRem(100)};
    width: ${pxToRem(498)};
    height: ${pxToRem(375)};
  } ;
`
