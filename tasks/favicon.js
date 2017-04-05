module.exports = (gulp, config, reload) => {
  return () => {
    return gulp.src(config.favicon.src)
      .pipe(gulp.dest(config.favicon.build))
      .pipe(reload({stream: true}));
  }
};