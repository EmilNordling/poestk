const { join, resolve } = require('path');
const express = require('express');
const compression = require('compression');
const sslRedirect  = require('heroku-ssl-redirect');

const mobileDir = 'dist_mobile';
const desktopDir = 'dist_desktop';

// Init app
const app = express();
const port = process.env.PORT || 3005;

// Gzip
app.use(compression());

if (process.env.NODE_ENV === 'production') {
  // http trafic to https
  app.use(sslRedirect());
}

// Cache
app.use(express.static(resolve(__dirname, desktopDir), {
  maxAge: '7d',
  setHeaders: (res, filePath) => {
    if (filePath.match(/(sw.js|index.html)$/)) {
      res.setHeader('Cache-Control', 'dist, max-age=0')
    }
  },
}));

// app.use(express.static(resolve(__dirname, mobileDir), {
//   maxAge: '7d',
//   setHeaders: (res, filePath) => {
//     if (filePath.match(/(sw.js|index.html)$/)) {
//       res.setHeader('Cache-Control', 'dist, max-age=0')
//     }
//   },
// }));

// Index route
app.get('/', (req, res) => {
  const userAgent = req.header('user-agent');

  if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(userAgent)) {
    res.sendFile(join(__dirname, desktopDir, 'index.html'));
    // res.sendFile(join(__dirname, mobileDir, 'index.html'));
  } else {
    res.sendFile(join(__dirname, desktopDir, 'index.html'));
  }
});

// Listen
app.listen(port, () => {
  console.log(`> Ready on ${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://localhost:${port}`)
});
