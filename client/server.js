const { join, resolve } = require('path')
const express = require('express')
const compression = require('compression')

// Init app
const server = express()
const port = process.env.PORT || 3000

// Gzip
server.use(compression())

// Cache
server.use(express.static(resolve(__dirname, 'dist'), {
  maxAge: '7d',
  setHeaders: (res, filePath) => {
    if (filePath.match(/(sw.js|index.html)$/)) {
      res.setHeader('Cache-Control', 'dist, max-age=0')
    }
  },
}))

// Index route
server.use((req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')))

// Listen
server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`)
})
