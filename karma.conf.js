module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('karma-sourcemap-loader'),
        require('karma-webpack')
      ],
      client:{
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage/your-project-name'),
        subdir: '.',
        reporters: [
          { type: 'html' },
          { type: 'text-summary' }
        ]
      },
      webpack: {
        mode: 'development',
        module: {
          rules: [
            {
              test: /\.ts$/,
              use: [
                { loader: 'ts-loader' },
                { loader: 'angular2-template-loader' }
              ],
              exclude: /node_modules/
            }
          ]
        }
      },
      files: [
        { pattern: './src/test.ts', watched: false }
      ],
      preprocessors: {
        './src/test.ts': ['webpack', 'sourcemap']
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      restartOnFileChange: true
    });
  };
  