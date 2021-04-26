const fs = require('fs')

// 어디에서 데이터를 가져올건가.
const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' })
const writeStream = fs.createWriteStream('./docs/blog4.txt')

// '데이터' 이벤트 리스너
// readStream.on('data', (chunk) => {
//     console.log('---------NEW CHUNK---------');
//     console.log(chunk);
//     writeStream.write('\nNew CHUNK\n')
//     writeStream.write(chunk)

// })

// piping 한 번에 읽고 쓰는게 가능함.
readStream.pipe(writeStream)