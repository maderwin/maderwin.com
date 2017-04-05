const plumber = require('gulp-plumber');
const spritesmith = require('gulp.spritesmith');

module.exports = (gulp, config, reload) => {
  return () => {
    let spriteData = gulp.src(config.sprites.src)
      .pipe(plumber())
      .pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../img/sprite.png',
        cssName: 'sprites.scss',
        cssFormat: 'scss',
        algorithm: 'binary-tree',
        padding: 0,
        cssVarMap: function (sprite) {
          sprite.name = 'sprite-' + sprite.name
        },
        cssTemplate: './src/sprites/scss.template'
      }));

    spriteData.img
      .pipe(plumber.stop())
      .pipe(gulp.dest(config.images.build));

    return spriteData.css
      .pipe(plumber.stop())
      .pipe(gulp.dest(config.sprites.build));
  }
};