'use strict';
// 引入 gulp
var gulp = require('gulp');
// 引入组件
var gutil = require('gulp-util');//gulp工具类
var mutuo = require("../");

//处理图片
gulp.task("coverRetina",function(){
  return gulp.src("src/slice/*")
        .pipe(mutuo());
})
// 默认任务
gulp.task('default',["coverRetina"],function(cb){
  gutil.log("[INFO] :")
  gutil.log("Done ---- task has been compiled!")
});