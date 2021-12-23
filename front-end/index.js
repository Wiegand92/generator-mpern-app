const Generator = require('yeoman-generator');
const { editorConfigs } = require('../fixtures/file-locations');

module.exports = class extends Generator {
  prompting() {
    this.log('hello from front-end!');
  }

  writing() {
    editorConfigs.forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file.templatePath),
        this.destinationPath('front-end/' + file.destinationPath),
      ),
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('front-end/package.json'),
    );
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('front-end/.gitignore'),
    );
  }
};
