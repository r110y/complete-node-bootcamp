const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1 - resource intensive, does not work for large files and it is not suitable for production ready code
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Solution 2: Streams - this will overwhelm the readable stream through something called 'back pressure' as it cannot sent it as fast as it is recieving it from the file.
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });

  // Solution 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDest)... prevents back pressure.
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
