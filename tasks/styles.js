const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const csso = require('postcss-csso');
const prefixer = require('autoprefixer');
const fontmagician = require('postcss-font-magician');
const dataUri = require('lib-sass-data-uri');

module.exports = (gulp, config, reload) => {
  return () => {
    return gulp.src(config.styles.src) //Выберем наш main.scss
      .pipe(plumber()) //
      .pipe(sourcemaps.init())
      .pipe(
        sass(
          Object.assign(
            config.sass,
            {
              functions: Object.assign(
                dataUri,
                { }
              )
            }
          )
        ).on(
          'error',
          sass.logError
        )
      )
      .pipe(postcss([
        csso(),
        prefixer(),
        // fontmagician({
        //   formats: config.fonts.formats,
        //   hosted: [config.fonts.src, config.fonts.build]
        // })
      ]))
      .pipe(sourcemaps.write(config.sourcemaps))
      .pipe(plumber.stop())
      .pipe(gulp.dest(config.styles.build))
      .pipe(reload({stream: true}));
  }
};