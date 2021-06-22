const LineByLineReader = require('line-by-line')
var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 

module.exports = {
    objReadLine: null,
    nNum: null,
    objLines: [],

    openFile: function(filepath){
        this.objReadLine = new LineByLineReader(filepath)
        this.objReadLine.pause()
        var me = this
        this.objReadLine.on('line', function(line) {
            me.objLines.push(line)
            if (me.objLines.length >= me.nNum) {
                me.objReadLine.pause()
                event.emit('done');
            }
        })
  
        this.objReadLine.on('error', function() {
            event.emit('done')
        })

        this.objReadLine.on('end', function() {
            event.emit('done')
        })        

    },

    getLines: function(nNum){
        var me = this
        this.objLines = []        

        this.nNum = nNum        
        if (nNum < 0 || this.nNum % 1 !== 0){
            event.emit('done')
        }
        if (me.objReadLine === null){
            event.emit('done')
        }        
        this.objReadLine.resume()
        return new Promise(function(resolve, reject) {
            event.once('done',function(){
                resolve(me.objLines)
            })
        })
    },

    readLines: async function(nNum) {
        return await this.getLines(nNum)
    },

    closeFile: function(){
        this.objReadLine.close()
        this.objReadLine = null
    }
}