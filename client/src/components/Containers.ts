import React from 'react'
import styled from 'styled-components'
import { colors } from '../constants'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`

export const GlobalContainer = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  background-color: ${colors.gray202};
`
