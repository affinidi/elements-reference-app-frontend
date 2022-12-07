import styled from 'styled-components'
import { pxToRem } from 'utils'

export const Container = styled.div<{ $isOpen: boolean }>`
  background: #0e1533;
  padding: ${pxToRem(22)} ${pxToRem(24)};
  height: ${(props) => (props.$isOpen ? `100vh` : 'auto')};
  text-align: right;
  overflow-y: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  transition: height 1s ease;
  @media (min-width: ${pxToRem(500)}) {
    padding: ${pxToRem(22)} ${pxToRem(100)};
  }
`
export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`

export const MenuContainer = styled.div`
  padding-top: ${pxToRem(20)};
`

export const ButtonContainer = styled.div`
  cursor: pointer;
`
export const Button = styled.button`
  background-color: #0e1533;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
