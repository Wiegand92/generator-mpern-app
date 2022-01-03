const Generator = require('yeoman-generator');
const { editorConfigs } = require('../fixtures/file-locations');

module.exports = class extends Generator {
  initializing() {
    this.env.options.nodePackageManager = 'npm';
    this.env.options.skipInstall = true;
    this.composeWith(require.resolve('../front-end'));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'confirm',
        name: 'backend',
        message: 'Do you want to create a back-end for your app?',
        default: true,
      },
    ]);
    this.config.set({ appname: this.appname, backend: this.answers.backend });
  }

  writing() {
    if (this.answers.backend) {
      this.composeWith(require.resolve('../back-end'));
      editorConfigs.forEach(file =>
        this.fs.copyTpl(
          this.templatePath(file.templatePath),
          this.destinationPath(file.destinationPath),
        ),
      );

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
      );

      this.fs.copyTpl(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore'),
      );
    }
  }

  installing() {
    this.spawnCommand('npm', ['install', '-ws=false']);

    if (this.answers.backend) {
      this.spawnCommand('npm', ['run', 'install-fe']);
      this.spawnCommand('npm', ['run', 'install-be']);
    }
  }
};
