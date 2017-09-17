
var thumbler = require('video-thumb');
const fs = require('fs');



//console.log(images);

function getFiles(dir){

    var files = fs.readdirSync(dir);


          thumbler.extract('https://www.youtube.com/watch?v=oS80hlsNvHo&feature=youtu.be', 'thumbnail.png', '00:00:22', '200x125', function(){


          });


}

getFiles('./');
