const Generator = require('yeoman-generator');
const { editorConfigs } = require('../fixtures/file-locations');

module.exports = class extends Generator {
  writing() {
    editorConfigs.forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file.templatePath),
        this.destinationPath('back-end/' + file.destinationPath),
      ),
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('back-end/package.json'),
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('back-end/.gitignore'),
    );

    this.fs.copy(
      this.templatePath('server.js'),
      this.destinationPath('back-end/server.js'),
    );
  }
};
