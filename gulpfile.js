const gulp = require('gulp');
const watch = require('gulp-watch');
const browser = require('browser-sync');
const rimraf = require('rimraf');
const fs = require('fs');

const config = require('./config');

const getTask = task => require('./tasks/' + task)(gulp, config, browser.reload);

let taskList = fs.readdirSync(config.tasks).map(filename => filename.replace(/\.js$/, ''));

taskList.map(taskName => {
  gulp.task('build-' + taskName, getTask(taskName));
  gulp.task('watch-' + taskName, () => watch(
    config[taskName].watch,
    (event, cb) => {
      gulp.start('build-' + taskName);
    }
  ));
});

gulp.task('build', taskList.map(taskName => 'build-' + taskName));

gulp.task('watch', taskList.map(taskName => 'watch-' + taskName));

gulp.task('clean', cb => rimraf(config.build, cb));

gulp.task( 'browser', () => browser(config.browser));

gulp.task('default', ['build', 'browser', 'watch']);

