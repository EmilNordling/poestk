import { css } from 'styled-components'

export const breakpoints = {
  large: '960px',
  medium: '640px',
  small: '420px',
}

export const colors = {
  gray: '#323640',
  gray400: '#313440',
  gray300: '#20232a',
  gray200: '#1d1f28',
  gray201: '#1d202a',
  gray202: '#1b1f2a',
  blue400: '#3fa6ff',
}

export const fontFamily = `
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto, Helvetica,
  Arial, sans-serif,
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol"
`

const sizes = {
  large: 1170,
  medium: 960,
  small: 520,
}

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `

  return acc
}, {})
