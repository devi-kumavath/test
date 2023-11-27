const exp = require("constants");
const express = require("express");
const path = require("path");
const port = 3700;

const app = express();

const url = " https://www.w3schools.com/nodejs/ref_path.asp";

console.log(` extname   ${path.extname(url)}`);

console.log(` join   ${path.join(url, "test", "test2")}`);

const parse = path.parse(url);
console.log(` parse   ${parse.ext}`);

console.log(` dirname   ${path.dirname(url)}`);

console.log(` basename   ${path.basename(url)}`);

console.log(` reslove   ${path.resolve(url)}`);

console.log(` normalize   ${path.normalize(url)}`);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
