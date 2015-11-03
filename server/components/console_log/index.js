/**
 * Created by qinghaibo on 2015/9/22.
 */
var fs = require('fs');
var util = require('util');
var path = require('path');
function outPutLog(){
    defineDebugLog();
}

//输出debug日志
function defineDebugLog(){
    var log_file = fs.createWriteStream(path.join(__dirname, '../../logs/debug.log'), { flags : 'a'});
    var log_stdout = process.stdout;

    console.log = function(content, debug) {
        if(!debug){
            log_file.write(new Date() + " " + util.format(content) + '\n');
        }
        log_stdout.write(new Date() + " " + util.format(content) + '\n');
    };
}


module.exports = outPutLog;