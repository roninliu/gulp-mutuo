"use strict";
/**
 * [gulp-mutuo : 自动转换@2x图片为@1x图片]
 * 默认生成在当前输入的文件夹下面
 */
var PLUGIN_NAME = "gulp-mutuo";
var through = require('through2');
var gutil = require('gulp-util');
var gm = require("gm");


module.exports = function(opt){
    var opts = opt ||{isUHD:false} ;
    /**
     * [coverImage 转换图片方法]
     * @param  {[string]} oriImg [原始图片path]
     * @param  {[string]} newImg [新建图片path]
     * @param  {[object]} size   [新图片的尺寸]
     * @return {[void]}        [如生成失败，打印失败日志，否则无返回值]
     */
    var coverImage = function(oriImg,newImg,size){
        var width = size.width;
        var height = size.height;
        gm(oriImg).resize(width,height)
        .write(newImg,function(error){
            if(error){
                gutil.log(gutil.colors.red(error));
            }
        })
    }
    /**
     * 插件具体干事情的在这里
     */
    return through.obj(function(file, encoding, cb){
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        if (file.isStream()) {
            this.emit("[Error]",new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'))
            return cb();
        }
        var _that = this;
        gm(file.path).identify(function(error,result){
            if(error){
                gutil.log(gutil.colors.red(error));
                return;
            }else{
                var _currentFileName =  result.path;
                if(opts.isUHD){
                    if(_currentFileName.indexOf("@3x") > -1){
                        if(result.size.width % 3 == 1 || result.size.height % 3 == 1){
                            gutil.log(gutil.colors.red("[Error]","Slice size must be a multiple of three!"));
                            return;
                        }else{
                            var _new2xFileName = _currentFileName.replace("@3x","@2x");
                            var _new2xFileSize = {
                                width:result.size.width/1.5,
                                height:result.size.height/1.5
                            }
                            var _newxFileName = _currentFileName.replace("@3x","");
                            var _newxFileSize = {
                                width:result.size.width/3,
                                height:result.size.height/3
                            }
                            coverImage(_currentFileName,_new2xFileName,_new2xFileSize);
                            coverImage(_currentFileName,_newxFileName,_newxFileSize);
                        }
                    }
                }else{
                    if(_currentFileName.indexOf("@2x") > -1){
                        if(result.size.width % 2 == 1 || result.size.height % 2 == 1){
                            gutil.log(gutil.colors.red("[Error]","Slice size must be an even number!"));
                            return;
                        }else{
                            var _newFileName = _currentFileName.replace("@2x","");
                            var _newFileSize = {
                                width:result.size.width/2,
                                height:result.size.height/2
                            }
                            coverImage(_currentFileName,_newFileName,_newFileSize);
                        }
                    }
                }
            }
        });
        _that.push(file);
        cb();
    });
};