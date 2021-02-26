const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const puppeteer = require("puppeteer");
var cors = require('cors')

app.use(cors())

app.get("/pdf", async (req, res) => {
  const url = req.query.target;

  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

  const webPage = await browser.newPage();

  await webPage.goto(url, {
      waitUntil: "networkidle0"
  });
  let path = '/usr/src/app/'+Math.random()+'.pdf';
  const pdf = await webPage.pdf({
      path: path,
      printBackground: true,
      format: "A4",
      margin: {
          top: "20px",
          bottom: "40px",
          left: "20px",
          right: "20px"
      }
  });

  

  await browser.close();

  res.contentType("application/json");
  res.send({
    path: req.protocol + '://' + req.get('host')+'/download?path='+path
  });
})

app.get('/download', function(req, res){
  let path = req.query.path
  const file = `${__dirname}/`+path;
  res.download(file); // Set disposition and send it.
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})