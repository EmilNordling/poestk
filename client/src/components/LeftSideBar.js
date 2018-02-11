import styled from 'styled-components'
import { colors } from '../constants'

const LeftSideBar = styled.div`
  z-index: 2;
  width: 200px;
  background-color: ${colors.gray};
  border-right: 2px solid ${colors.gray300};
`

export default LeftSideBar
