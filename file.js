const fs = require("fs");
const os = require("os");

console.log(os.cpus().length)

// * Sync Call
// fs.writeFileSync("./test.txt", "Hello World!");

// * Async Call
// fs.writeFile("./test.txt", "Hello World!", (err) => { });

// * Read Sync Call
// const data = fs.readFileSync("./contact.txt", "utf-8");
// console.log(data)

// * Read Async Call
// fs.readFile("./contact.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(data)
// })

// * Append File
// fs.appendFileSync("./test.txt", `${Date.now()} Hey there\n`);

