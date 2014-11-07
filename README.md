GULP Mutuo (穆托)
=================

gulp-mutuo(自动转换切片中的@2x图片为@1x图片)
--------------------------------------------------


### 依赖
gulp-mutuo需要安装Graphics Magick(gm)


### 安装
```
npm install gulp-mutuo
```


### 配置
导入gulp-mutuo依赖：

```
var mutuo = require("gulp-mutuo");

```

gulpfile配置文件中增加task，如下：
```
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
```

### 实例
具体实例请参考example文件下demo
