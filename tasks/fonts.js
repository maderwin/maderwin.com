module.exports = (gulp, config, reload) => {
  return () => {
    return gulp.src(config.fonts.src)
      .pipe(gulp.dest(config.fonts.build))
      .pipe(reload({stream: true}));
  }
};