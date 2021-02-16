const express = require('express')
const app = express()
const port = 3030
const puppeteer = require("puppeteer");

app.get("/pdf", async (req, res) => {
  const url = req.query.target;

  const browser = await puppeteer.launch({
      headless: true
  });

  const webPage = await browser.newPage();

  await webPage.goto(url, {
      waitUntil: "networkidle0"
  });

  const pdf = await webPage.pdf(
    { path: 'pdf'+Math.random()+'.pdf', format: 'A4' }
  );

  await browser.close();

  res.contentType("application/pdf");
  res.send(pdf);

})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})