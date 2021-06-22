const LineByLineReader = require('line-by-line')
var EventEmitter = require('events').EventEmitter; 

var FSReadLines = function(){}

FSReadLines.prototype.objReadLine = null;

FSReadLines.prototype.nNum = null;

FSReadLines.prototype.objLines = null;

FSReadLines.prototype.event = null;

FSReadLines.prototype.openFile = function(filepath, encoding){
    if (typeof encoding === 'undefined'){
        encoding = 'utf8'
    }
    this.objReadLine = new LineByLineReader(filepath, {
        encoding: encoding
    })
    this.event = new EventEmitter();     
    this.objReadLine.pause();
    var me = this;
    this.objReadLine.on('line', function(line) {
        me.objLines.push(line);
        if (me.objLines.length >= me.nNum) {
            me.objReadLine.pause();
            me.event.emit('done');
        }
    })

    this.objReadLine.on('error', function() {
        me.event.emit('done');
    })

    this.objReadLine.on('end', function() {
        me.event.emit('done');
    })        

}

FSReadLines.prototype.readLines = function(nNum) {
    var me = this;
    this.objLines = [];        

    this.nNum = nNum;        
    if (nNum < 0 || this.nNum % 1 !== 0){
        this.event.emit('done');
    }
    if (me.objReadLine === null){
        this.event.emit('done');
    }        
    this.objReadLine.resume();
    return new Promise(function(resolve, reject) {
        me.event.once('done',function(){
            resolve(me.objLines);
        })
    })
}

FSReadLines.prototype.closeFile = function(){
    this.objReadLine.close();
    this.objReadLine = null;
    delete this.event;
    this.event = null;
}

module.exports = FSReadLines;