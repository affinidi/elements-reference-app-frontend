import styled from 'styled-components'
import { pxToRem } from 'utils'

export const Ticket = styled.div`
  width: ${pxToRem(392)};
  height: ${pxToRem(176)};
  margin: ${pxToRem(24)} ${pxToRem(40)} ${pxToRem(26)} ${pxToRem(0)};
  position: relative;
  background-color: none;
  transition: all 300ms cubic-bezier(0.03, 0.98, 0.53, 0.99) 0s;
  border-radius: 15px;
  cursor: pointer;
  background-image: url(./src/assets/svg/ticket-preview-desktop.svg);
  &:hover {
    box-shadow: 0 4px 29px 0 rgba(0, 0, 0, 0.15);
    background-color: rgba(0, 0, 0, 0.05);
  }
`

export const TicketWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const TicketHeader = styled.div<{ $isActive: boolean }>`
  width: ${pxToRem(84)};
  height: 100%;
  position: absolute;
  right: 0;
  background-image: ${(props) =>
    props.$isActive
      ? `url(./src/assets/svg/watermark.svg)`
      : `url(./src/assets/svg/watermark.svg)`};
`

export const TicketLine = styled.div<{ $isActive: boolean }>`
  width: ${pxToRem(20)};
  height: 100%;
  position: absolute;
  left: 0;
  background-image: url(./src/assets/svg/ticket-preview-highlight.svg);
`

export const Box = styled.div`
  margin: ${pxToRem(0)} ${pxToRem(40)} ${pxToRem(26)} ${pxToRem(0)};
  top: ${pxToRem(24)};
  left: ${pxToRem(40)};
  position: absolute;
`
