const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

// It's best practice to create a new child class instead of using EventEmitter directly

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name is Joe");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are ${stock} items left`);
});

myEmitter.emit("newSale", 9);

// This is the observer pattern.

////////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request recieved");
  res.end("Request recieved");
});

server.on("request", (req, res) => {
  console.log("Request recieved :D");
  res.end("Request recieved :D");
});

server.on("close", () => {
  console.log("Bye bye!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
