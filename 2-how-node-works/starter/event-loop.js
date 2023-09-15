const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("timer 1 finished"), 0); // This is executed secondly as it is synchronous and blocks the execution of other code

setImmediate(() => console.log("immediate 1 finished")); // Executed immediately after the timer

fs.readFile("test-file.txt", () => {
  console.log("i/o finished");
  console.log("-------------------------");

  setTimeout(() => console.log("timer 2 finished"), 0);
  setTimeout(() => console.log("timer 3 finished"), 3000);
  setImmediate(() => console.log("immediate 2 finished")); // This is executed firstly inside of an I/O cycle as execution will pause in the polling phase...

  process.nextTick(() => console.log("process.nextTick")); // occurs immediately after the first console.log NEXT TICK DOES NOT MEAN NEXT TICK (LOOP)... IT MEANS BEFORE NEXT PHASE OF LOOP

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
}); // I/O tasks are taken out of the event loop, and this one will complete last as its a large file

console.log("hello from the top level code"); // executed first as it is top level code
