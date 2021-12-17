const Generator = require('yeoman-generator')
module.exports = class extends Generator{

  initializing(){
    this.composeWith(require.resolve('../front-end'))
  }

  prompting(){
    this.log('helloo!')
  }

}