
const express = require("express");
const fs = require("fs");
const port = 3600;

const app = express();

// Read Files   ⁉️🙋‍♂️

// fs.readFile() method is used to read files on your computer.
// fs.readFile("testfile.txt", (err, data) => {
//   if (err) {
//     console.log(`failed reading the file ${err}`);
//   } else {
//     console.log(data.toString());
//   }
// });

// Create Files  ⁉️🙋‍♂️

// fs.appendFile() method appends specified content to a file. If the file does not exist, the file will be created:
// fs.appendFile(
//   "testfile.txt",
//   "appending data in notes file using fs using fs.appendfile()",
//   (err) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log("data appended successfully");
//     }
//   }
// );

// fs.open() method takes a "flag" as the second argument, if the flag is "w" for "writing", the specified file is opened for writing. If the file does not exist, an empty file is created:
// fs.open("testfile.txt", "r+", (err , file) => {

//     fs.read(file , 'utf8' , (err , data ) => {
//         if (err) throw err;
//         console.log(`reading data using r+ mode  ${data}`);

//         const newdata = 'writing data using r+ in notes file';
//         fs.write(file ,   newdata , (err) => {
//             if (err) throw err;
//             console.log('data saved using r+ mode');
//         })

//         fs.close(file , (err) => {
//             if (err) throw err;
//             console.log('file closed');
//         })

//     })

// });

// The fs.writeFile() method replaces the specified file and content if it exists. If the file does not exist, a new file, containing the specified content
// const content =
//   "writing data using writeFile(): " +
//   "it will create a new file and write data. " +
//   "If the file already exists, it will clear old data " +
//   "and write new data.";

// fs.writeFile("testfile.txt", content, (err) => {
//   if (err) throw err;

//   console.log("Data written successfully.");
// });


   

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port} is listening`);
});
