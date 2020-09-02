const glob = require('glob');
const path = require('path');
const { runInDebugContext } = require('vm');

module.exports = (cfg, { options }) => {
    const inputPath = path.join(__dirname, './src/modules');

    // const pieces = {
    //     target: 'node',
    //     mode: cfg.mode,
    //     entry: ,
    //     watch: true,
    //     watchOptions: { poll: 500 },
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.ts$/,
    //                 use: ['ts-loader'],
    //             },
    //         ],
    //     },
    //     resolve: {
    //         extensions: ['.ts', '.js'],
    //     },
    //     output: {
    //         path: path.join(options.outputPath, 'pieces'),
    //         filename: '[name].js',
    //         libraryTarget: 'commonjs',
    //     },
    //     stats: {
    //         chunks: false,
    //         chunkOrigins: true,
    //         chunkModules: true,
    //     },
    // };

    const pieces = glob.sync(`${inputPath}/**/*.ts`).reduce((obj, file) => {
        // console.log(file, curValue)
        const fileName = `modules${file
            .replace(inputPath, '')
            .replace('.ts', '')}`;
        obj[fileName] = file;
        return obj;
    }, {});

    return {
        ...cfg,
        entry: {
            main: cfg.entry.main,
            ...pieces,
        },
        output: {
            path: options.outputPath,
            filename: '[name].js',
            libraryTarget: 'commonjs',
        },
    };
};
