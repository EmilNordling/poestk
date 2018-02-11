import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const iconMap = preval`
  const fs = require('fs')
  const { join, resolve } = require('path')
  const xmlToJson = require('./prevalUtils')
  const DOMParser = require('xmldom').DOMParser

  const iconPath = resolve('public/icons')
  const icons = fs.readdirSync(iconPath)

  module.exports = icons
    .reduce((acc, file) => {
      const fileData = fs.readFileSync(join(iconPath, file), 'utf8')
      const parser = new DOMParser();
      const content = parser.parseFromString(fileData, "image/svg+xml")
      const jsonedThin = xmlToJson(content)

      acc[file.slice(0, -4)] = {
        path: /d="(.*?)"/.exec(fileData)[1],
        viewBox: /viewBox="(.*?)"/.exec(fileData)[1],
        test: jsonedThin
      }

      return acc
    }, {})
`

const Svg = styled.svg`
  display: inline-block;
  vertical-align: text-top;
  width: 1em;
  height: 1em;
  fill: currentColor;
  pointer-events: none;
`
//<path d={iconMap[name].path} />

const Icon = ({ name, ...rest }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox={iconMap[name].viewBox} {...rest}>
    {'xDDD'}
  </Svg>
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Icon
