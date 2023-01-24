import styled from 'styled-components'
import { pxToRem } from 'utils'

export const Ticket = styled.div`
  width: 650px;
  height: 320px;
  margin: 100px auto;
  position: relative;
  transition: all 300ms cubic-bezier(0.03, 0.98, 0.53, 0.99) 0s;
  background: #fff;
  border-radius: 20px;
  padding: 5px;
  z-index: 5;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 130px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    z-index: 2;
    background-color:  #fff;
  }

  &:before {
    border-top-color: transparent;
    border-left-color: transparent;
    transform: rotate(-45deg);
    left: -35px;
  }

  &:after {
    border: 5px solid  #fff;
    border-top-color: transparent;
    border-left-color: transparent;
    transform: rotate(135deg);
    right: -35px;
  }
`

export const TicketWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: yellow;
  border-radius: 15px;
`

export const TicketHeader = styled.div`
  width: 15%;
  height: 100%;
  position: relative;
//   background: blue;
  background-image: url(./src/assets/svg/watermark.svg);
  border-radius: 15px;
  z-index: 1
`

export const Box = styled.div`
  width: 15%;
  top: 15px;
  left: 20px;
  position: absolute;
  z-index: 1;
`
