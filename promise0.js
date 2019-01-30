// const fs = require('fs-extra');
const fs = require('fs');

process.on('unhandledRejection', (err)=>{
  console.error(err);
})

const crypto = require('crypto');

let filePaths = [];

function writeFile() {
  let filePath = `./files/${crypto.randomBytes(6).toString('hex')}.txt`
  fs.writeFileSync( filePath, crypto.randomBytes(2048).toString('base64') )
  filePaths.push(filePath);
}

function synchronous() {
  console.time("sync");
  /* fs.readFileSync("./test.txt")
  fs.readFileSync("./test2.txt") */
  filePaths.forEach((filePath)=>{
    fs.readFileSync(filePath)
  })
  console.timeEnd("sync")
}

async function asynchronous() {
  console.time("async");
  /* let p0 = fs.promises.readFile("./test.txt");
  let p1 = fs.promises.readFile("./test2.txt"); */
  // await Promise.all([p0,p1])
  let promiseArray = [];
  filePaths.forEach((filePath)=>{
    promiseArray.push(fs.promises.readFile(filePath))
  })
  await Promise.all(promiseArray)
  console.timeEnd("async")
}

function promiseRun() {
  console.time("promise run");
  return new Promise((resolve)=>resolve())
  .then(()=>console.timeEnd("promise run"))
}

function hunderedPromiseRuns() {
  let promiseArray = [];
  console.time("100 promises")
  for(let i = 0; i < 100; i++) {
    promiseArray.push(new Promise((resolve)=>resolve()))
  }
  return Promise.all(promiseArray).then(()=>console.timeEnd("100 promises"))
}

promiseRun()
hunderedPromiseRuns()
// let time0 = new Date()

/* let oldFiles = fs.readdirSync("./files")
oldFiles.forEach((file)=>{
  fs.unlinkSync("./files/"+file)
})
if (!fs.existsSync("./files")){
  fs.mkdirSync("./files")
} */

/* console.time("file write")
for (let index = 0; index < 100; index++) {
  writeFile()
}
console.timeEnd("file write") */

// synchronous()
// asynchronous()