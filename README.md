GULP Mutuo (穆托)
=================

gulp-mutuo(自动转换切片中的@Nx图片为@2x、@1x图片)
--------------------------------------------------

### 说明
1.如果是@2x转化为@1x的图片，需要@2x的图片的尺寸必须是偶数。
2.如果是@3x转化为@2x，@1x的图片，需要@3x的图片尺寸是3的倍数。

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

### API

isUHD: 默认false，支持3倍图转换为@2x，@1x的图片
```
//处理图片
gulp.task("coverRetina",function(){
  return gulp.src("src/slice/*")
        .pipe(mutuo({isUHD:true}));
})
```

### 实例
具体实例请参考example文件下demo

### change log
2014-12-23：
1.增加3倍图支持
2.优化核心生成图片的模式。
3.省去了不必要的计算模式。