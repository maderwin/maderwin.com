const rollup = require('gulp-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const sourcemaps = require('gulp-sourcemaps');
const uglifyjs = require('uglify-js');
const minifier = require('gulp-uglify/minifier');
const plumber = require('gulp-plumber');
const inject = require('rollup-plugin-inject');
const glslify = require('glslify');
const MagicString = require('magic-string');
const rename = require('gulp-rename');

const glsl = () => {
    return {
        transform(code, id) {
            if (!/\.glsl$|\.vert$|\.frag$/.test(id)) return;
            //
            let msCode = new MagicString(code);

            let res = JSON.stringify(
                glslify(code)
                    .replace(/[ \t]*\/\/.*\n/g, '')
                    .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '')
                    .replace(/\n{2,}/g, '\n')
            );
            msCode.overwrite(0, code.length, 'export default ' + res + ';');

            return {
                code: msCode.toString(),
                map: msCode.generateMap().toString()
            };
        },
    };
};

module.exports = (gulp, config, reload) => {
    return () => {
        let stream = gulp.src(config.scripts.src)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(rollup({
                allowRealFiles: true,
                entry: config.scripts.entry,
                format: 'es',
                sourceMap: true,
                plugins: [
                    // inject({
                    //   include: '**/*.js',
                    //   exclude: 'node_modules/**',
                    // }),
                    glsl(),
                    babel({
                        presets: [
                            ['es2015', {'modules': false}]
                        ],
                        plugins: [
                            "transform-es2015-classes",
                            "transform-class-properties",
                            "transform-es2015-destructuring",
                            "transform-object-rest-spread",
                            "glslify",
                            "external-helpers"
                        ],
                        // exclude: 'node_modules/**',
                        include: [
                            './src/**',
                            './node_modules/postprocessing/**',
                            './node_modules/just-mix/**'
                        ]
                    }),
                    commonjs(),
                    resolve(),
                ]
            }))
            .pipe(gulp.dest(config.scripts.build))
            .pipe(minifier({
                preserveComments: 'license',
                compress: {
                    unused: false
                }
            }, uglifyjs))
            .pipe(sourcemaps.write(config.sourcemaps))
            .pipe(rename({suffix: '.min'}))
            .pipe(plumber.stop())
            .pipe(gulp.dest(config.scripts.build))
            .pipe(reload({stream: true}));
    }
};