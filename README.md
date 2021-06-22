**based on line-by-line, and add function readlines, can read some lines.** 

usage:

```
var FSReadLines = require("fsreadlines");
var fsreadlines = new FSReadLines();
var test = async function(){
    fsreadlines.openFile(__dirname + '\\test.js');
    var nNum = 5
    while(true){
        var lines = await fsreadlines.readLines(nNum);
        console.log(lines);
        console.log(lines.length);
        if (lines.length < nNum){
            break;
        }
    }
    console.log('finish.');
    fsreadlines.closeFile();
}

test();


```

