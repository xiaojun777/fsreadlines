var fsreadlines = require("./fsreadlines")
var test = async function(){
    fsreadlines.openFile(__dirname + '\\fsreadlines.js')
    var nNum = 5
    while(true){
        var lines = await fsreadlines.readLines(nNum)
        console.log(lines)
        console.log(lines.length)
        if (lines.length < nNum){
            break;
        }
    }
    console.log('finish.')
    fsreadlines.closeFile()
}

test()