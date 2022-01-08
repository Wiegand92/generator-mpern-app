const Generator = require('yeoman-generator');
const { editorConfigs } = require('../fixtures/file-locations');
const { frontEnd } = require('../fixtures/frontEndDependencies');
const { mkPublic } = require('../utils/makePublic');

module.exports = class extends Generator {
  async prompting() {
    this.log('Lets create your front-end!');
    this.answers = await this.prompt([
      {
        type: 'confirm',
        name: 'tailwind',
        message: 'Would you like to use tailwind for styling?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'jest',
        message: 'Would you like to use jest for testing?',
        default: true,
      },
    ]);
  }

  writing() {
    const useBackEnd = this.config.get('backend');
    // If we are making a back-end as well, everything goes in to the front-end folder, else in the root folder
    const destinationPath = useBackEnd ? 'front-end/' : '';

    // Copy editor configurations
    editorConfigs.forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file.templatePath),
        this.destinationPath(destinationPath + file.destinationPath),
      ),
    );

    //Store package.json in a variable to modify
    const packageJSON = require(this.templatePath('_package.json'));

    packageJSON.dependencies = frontEnd.dependencies;
    packageJSON.devDependencies = frontEnd.devDependencies;

    if (!useBackEnd) {
      // Copy webpack config template
      copyWebpack(this, destinationPath, {
        outputPath: 'public',
        backend: useBackEnd,
      });

      mkPublic(destinationPath);
    } else {
      // Copy webpack config template
      copyWebpack(this, destinationPath, {
        outputPath: '../back-end/public',
        backend: !!useBackEnd,
      });
    }

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(destinationPath + 'src/index.html'),
      { appname: this.config.get('appname') },
    );

    // If we are using jest add dependencies
    if (this.answers.jest) {
      packageJSON.devDependencies = {
        ...packageJSON.devDependencies,
        ...frontEnd.jest,
      };
    }

    // If we are using tailwind, add dependencies and config files
    if (this.answers.tailwind) {
      packageJSON.devDependencies = {
        ...packageJSON.devDependencies,
        ...frontEnd.tailwindCSS,
      };
      this.fs.copy(
        this.templatePath('postcss.config.js'),
        this.destinationPath(destinationPath + 'postcss.config.js'),
      );
      this.fs.copy(
        this.templatePath('tailwind.config.js'),
        this.destinationPath(destinationPath + 'tailwind.config.js'),
      );
    }

    if (!useBackEnd) {
      packageJSON.name = this.config.get('appname');
    }

    // Create package.json
    this.fs.writeJSON(
      this.destinationPath(destinationPath + 'package.json'),
      packageJSON,
    );

    // Copy base files
    this.fs.copyTpl(
      this.templatePath('components'),
      this.destinationPath(destinationPath + 'src/components'),
      { appname: this.config.get('appname') },
    );

    // Copy index.js
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(destinationPath + 'index.js'),
      { tailwind: this.answers.tailwind },
    );

    // Copy .babelrc
    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath(destinationPath + '.babelrc'),
    );

    // Copy styles folder and files
    this.fs.copy(
      this.templatePath('styles'),
      this.destinationPath(destinationPath + 'src/styles'),
    );

    // Copy .gitignore
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath(destinationPath + '.gitignore'),
    );
  }
};

function copyWebpack(generator, destinationPath, templateValues) {
  // Copy webpack config template
  generator.fs.copyTpl(
    generator.templatePath('webpack.config.js'),
    generator.destinationPath(destinationPath + 'webpack.config.js'),
    templateValues,
  );
}
