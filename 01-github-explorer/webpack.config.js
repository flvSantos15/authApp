const path = require('path')

module.exports = {
    //Arquivo que diz onde esta o arquivo inicial, arquivo de entrada
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    //Arquivo a ser gerado, arquivo de saida
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    //Aqui vou dizer que ele vai receber varios tipos de arquivos
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ],
    }
}