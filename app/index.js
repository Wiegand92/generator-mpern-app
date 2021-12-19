const Generator = require('yeoman-generator');
const {editorConfigs} = require('../fixtures/file-locations');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../front-end'));
  }

  prompting() {
    this.log('helloo!');
  }

  writing() {
    editorConfigs.forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file.templatePath),
        this.destinationPath(file.destinationPath),
      ),
    );
  }
};
