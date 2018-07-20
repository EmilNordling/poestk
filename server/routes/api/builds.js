const router = require('express').Router();
const mongoose = require('mongoose');
const Build = mongoose.model('Build');
const User = mongoose.model('User');
const auth = require('../auth');

router.post('/', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if (!user) { return res.sendStatus(401); }

    const build = new Build(req.body.build);

    build.author = user;

    return build.save().then(() => {
      console.log(build.author);
      return res.json({ build: build.toJSONFor(user) });
    });
  }).catch(next);
});

module.exports = router;
