module.exports = (gulp, config, reload) => {
  return () => {
    return gulp.src(config.html.src)
      .pipe(gulp.dest(config.html.build))
      .pipe(reload({stream: true}));
  }
};