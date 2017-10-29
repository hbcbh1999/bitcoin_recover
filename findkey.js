let CoinKey = require('coinkey')
let fs = require('fs');

var bitcoinAddress 
var filename 
let fastscan = false
var offset = 0

process.argv.forEach(function (val, index, array) {
    if (index == 2) {
      bitcoinAddress = String(val)
    }
    else if (index == 3) {
      filename = String(val)
    }
    else if (index == 4) {
      if (val == '-f') {
        fastscan = true
        offset = 2
      }
    }
});

var readStream = fs.createReadStream(filename);
const stats = fs.statSync(filename)
const fileSizeInBytes = stats.size

var prevChunkTail = new Buffer('')
var bytesRead = 0

function scanChunk(chunk) {
  bytesRead += chunk.length - 32 + offset
  let pctCompletion = 100*bytesRead/fileSizeInBytes
  console.log('File scanned: %', parseFloat(pctCompletion).toFixed(5),' complete')
 
  for (var i = 0; i <= chunk.length - 32 + offset; i++) {
    if ( fastscan == true && chunk[0] != 0x04 && chunk[1] != 0x20) {
      continue;
    }
    let slice = chunk.slice(i + offset, i + 32 + offset)
    let key = new CoinKey(new Buffer.from(slice, 'utf8'))
    let address = key.publicAddress 
    if (address === bitcoinAddress) {
      console.log('Key found address: ', address, ' secretKey:', slice.toString('utf8'))
      process.exit()
    }
  }
}

//Carry tail of last 32 bytes into the front of next slice
readStream.on('data', function (chunk) {
  let buf = Buffer.concat([prevChunkTail, chunk])
  scanChunk(buf)
  prevChunkTail = chunk.slice(chunk.length - 32 + offset,chunk.length)
})

