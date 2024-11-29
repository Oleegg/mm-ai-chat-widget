const path = require('path');

module.exports = {
  entry: './src/index.ts', // Входной файл вашего виджета
  output: {
    filename: 'widget.js',
    path: path.resolve(__dirname, 'build'),
    library: 'Widget', // Имя глобальной переменной для виджета
    libraryTarget: 'umd', // Поддержка CommonJS, AMD и глобальных переменных
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Поддерживаемые расширения
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Обработка TypeScript
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Обработка CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader'
      }
    ],
  },
  externals: {
    react: 'React',       // React не включается в сборку
    'react-dom': 'ReactDOM',
  },
  mode: 'production', // Режим production минимизирует код
};