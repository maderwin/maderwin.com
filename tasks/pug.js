const plumber = require('gulp-plumber');
const path = require('path');
const gulpData = require('gulp-data');
const gulppug = require('gulp-pug');
const extend = require('extend');

module.exports = (gulp, config, reload) => {
  function noCache(filepath) {
    let file = path.join('..', config.pug.data, filepath);
    
    delete require.cache[require.resolve(file)];
    let data = require(file);

    return data;
  }

  return () => {
    return gulp.src(config.pug.src)
      .pipe(plumber())
      .pipe(gulpData((file) => {
        let
          commonData = noCache('common'),
          tplData = noCache(path.basename(file.path, '.pug'));
        return extend(true, commonData, tplData);
      }))
      .pipe(gulppug({pretty: true})) //
      .pipe(plumber.stop())
      .pipe(gulp.dest(config.pug.build))
      .pipe(reload({stream: true}));
  }
};