const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug');
const User = mongoose.model('User');

const BuildSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  name: String,
  character: String,
  passives: String,
  items: String,
  bandits: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

BuildSchema.plugin(uniqueValidator, { message: 'is already taken' });

BuildSchema.pre('validate', function(next) {
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

BuildSchema.methods.slugify = function() {
  this.slug = `${slug(this.title)}-${(Math.random() * Math.pow(36, 6) | 0).toString(36)}`;
};

BuildSchema.methods.toJSONFor = function(user) {
  return {
    slug: this.slug,
    name: this.name,
    character: this.character,
    passives: this.passives,
    items: this.items,
    bandits: this.bandits,
    author: this.author.toProfileJSONFor(user),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Build', BuildSchema);
