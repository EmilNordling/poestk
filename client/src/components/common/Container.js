import styled from 'styled-components'
import { media } from '../../constants'

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 12px;

  ${media.small`
    padding: 0 24px;
  `}
`

export default Container
