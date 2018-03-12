const fs = require('fs');
const cheerio = require('cheerio');
const dataFolder = './app/data/';
const pageFileName = './app/index.html';

fs.readdir(dataFolder, (err, files) => {
    let names = files.map(file => file.match(/\w+/)[0]);

    let page = fs.readFile(pageFileName, 'utf-8', function(err, content) {
        let $ = cheerio.load(content),
            linkContainer = $('.data-list-body'),
            result;

      $(linkContainer).empty();

      for (var i = 0; i < names.length; i++) {
          $(linkContainer).append($(`<a class="data-selector">${names[i]}</a>`));
          if (i < names.length - 1) {
              $(linkContainer).append('\n');
          }
      }

      result = $.html();

      fs.writeFile(pageFileName, result, function(error){
          if(error) throw error; // если возникла ошибка

      });
  });
});
