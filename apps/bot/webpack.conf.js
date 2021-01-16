const glob = require('glob');
const path = require('path');

module.exports = (cfg, { options }) => {
    const inputPath = path.join(__dirname, './src/modules');

    const pieces = glob.sync(`${inputPath}/**/*.ts`).reduce((obj, file) => {
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
