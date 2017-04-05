const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

module.exports = (gulp, config, reload) => {
  return () => {
    return gulp.src(config.embed.src)
      .pipe(plumber())
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
      }))
      .pipe(plumber.stop())
      .pipe(gulp.dest(config.embed.build))
      .pipe(reload({stream: true}));
  }
};