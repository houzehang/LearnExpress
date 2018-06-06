let  fs = require('fs');
let  join = require('path').join;
let path = require('path');

let fs_util = {
    /**
     * @param startPath  起始目录文件夹路径
     * @returns {Array}
     */
    findSync:function(startPath){
        let result=[];
        function finder(path) {
            let files=fs.readdirSync(path);
            files.forEach((val,index) => {
                let fPath=join(path,val);
                let stats=fs.statSync(fPath);
                if(stats.isDirectory()) finder(fPath);
                if(stats.isFile()) result.push(fPath);
            });

        }
        finder(startPath);
        return result;
    }
}

module.exports = fs_util;