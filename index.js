"use strict";
/**
 * [gulp-mutuo : 自动转换@2x图片为@1x图片]
 * 默认生成在当前输入的文件夹下面
 */
var PLUGIN_NAME = "gulp-mutuo";
var through = require('through2');
var gutil = require('gulp-util');
var gm = require("gm");
var fs = require('fs-extra');
var fileExists = require('file-exists');
var del = require('del');


module.exports = function(){
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
                gutil.log("[Error] ", error);
                return;
            }else{
                var _currentFile = result;
                var _currentFileSize = _currentFile.size;
                var _currentFileName = _currentFile.path;
                if(_currentFileName.indexOf("@2x")  > -1){
                    if(_currentFileSize.width %2 == 1 || _currentFileSize.height % 2 == 1){
                        gutil.log("[Error]","Slice size must be even number!");
                        return;
                    }
                    var _currentNewFileName = _currentFileName.replace("@2x","");
                    if(fileExists(_currentNewFileName)){
                        del(_currentNewFileName);
                    }
                    fs.copy(_currentFileName,_currentNewFileName,function(err){
                        if(err){
                            gutil.log("[Error] " , err);
                            return;
                        }else{
                            var _fileWidth = _currentFileSize.width/2;
                            var _fileHight = _currentFileSize.height/2;
                            gm(_currentNewFileName)
                            .resize(_fileWidth,_fileHight)
                            .write(_currentNewFileName,function(errors){
                                if(errors){
                                    gutil.log("[Error]",errors);
                                    return;
                                }
                            })
                        }
                    })
                }
            }
        });
        _that.push(file);
        cb();
    });
};