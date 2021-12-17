const Generator = require('yeoman-generator')
module.exports = class extends Generator{

  prompting(){
    this.log('hello from front-end!')
  }

}