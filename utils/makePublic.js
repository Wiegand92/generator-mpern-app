const mkdirp = require('mkdirp');

module.exports = {
  mkPublic: async function (destinationPath) {
    await mkdirp(destinationPath + 'public/images');
    await mkdirp(destinationPath + 'public/scripts');
  },
};
