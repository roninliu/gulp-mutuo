'use strict';
// 引入 gulp
var gulp = require('gulp');
// 引入组件
var gutil = require('gulp-util');//gulp工具类
var mutuo = require("../");

//处理图片
gulp.task("cover3Retina",function(){
  return gulp.src("src/slice/*")
        .pipe(mutuo({isUHD:true}));
})

//处理图片
gulp.task("cover2Retina",function(){
  return gulp.src("src/slice/*")
        .pipe(mutuo());
})
// 默认任务
gulp.task('default',function(cb){
  gutil.log(gutil.colors.magenta("[INFO] : please run as below command for test:"))
  gutil.log(gutil.colors.magenta("gulp cover2Retina"));
  gutil.log(gutil.colors.magenta("gulp cover3Retina"));
});