const request = require('request');
const fs = require('fs');


const fetcher = function(url, filePath) {
  request(url, (error, response, data) => {
    if (!error && response.statusCode === 200)
      fs.writeFile(filePath, data, 'utf8', () => {
        fs.stat(filePath, (err, stats) => {
          if (!err) {
            console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
          }
        });
      });
  });
};

const args = process.argv.slice(2);
fetcher(args[0], args[1]);