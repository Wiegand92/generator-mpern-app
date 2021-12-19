module.exports = {
  editorConfigs: [
    // {
    //   name: '',
    //   destinationPath: '',
    //   templatePath: '',
    // }
    {
      name: 'vscode',
      destinationPath: '.vscode/settings.json',
      templatePath: './editor-configs/.vscode/settings.json',
    },
    {
      name: 'eslint',
      destinationPath: '.eslintrc.js',
      templatePath: './editor-configs/.eslintrc.js',
    },
    {
      name: 'prettier',
      destinationPath: '.prettierrc.js',
      templatePath: './editor-configs/.prettierrc.js',
    },
  ],
};
