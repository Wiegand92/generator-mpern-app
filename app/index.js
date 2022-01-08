const Generator = require('yeoman-generator');
const { editorConfigs } = require('../fixtures/file-locations');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

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
    const installApp = spawn('npm', ['install', '-ws=false'], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });
    this.log('We will now begin installing dependencies');

    if (this.answers.backend) {
      let installFeP;
      installApp.on('close', () => {
        this.log('Please wait while we install your front-end');
        installFeP = installFe();
        installFeP.on('close', () => {
          this.log('Please wait while we install your back-end');
          const installBe = spawn('npm', ['install'], {
            cwd: path.join(process.cwd(), 'back-end'),
            stdio: 'inherit',
          });
        });
      });
    }

    function installFe() {
      return spawn('npm', ['install'], {
        cwd: path.join(process.cwd(), 'front-end'),
        stdio: 'inherit',
      });
    }
  }
};
