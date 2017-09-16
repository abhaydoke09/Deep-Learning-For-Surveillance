
var thumbler = require('video-thumb');
const fs = require('fs');



//console.log(images);

function getFiles(dir){

    var files = fs.readdirSync(dir);
    for(var i in files){
        //console.log(files[i]);
        if(files[i].includes(".mp4")){

          thumbler.extract(files[i], files[i].replace("mp4","png"), '00:00:22', '200x125', function(){


          });


        }
    }
}

getFiles('./');
