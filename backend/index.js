const express = require('express');
const PythonShell = require('python-shell');

const port = 3000;
const app = new express();
const pythonFile = "test.py";

app.listen(port, err => {
  if(err) console.log(err);
  else console.log("listening on PORT: " + port);
})

app.get('/video',(req,res) => {

  const opts = {
    mode : 'json'
  }

  const pyshell = new PythonShell(pythonFile,opts);

  pyshell.send(req.query);

  pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
    pyshell.end(function (err) {
      if (err) throw err;
      console.log('finished')
    });

    res.json(message);
  });

// end the input stream and allow the process to exit



});
