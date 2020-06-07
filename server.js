const puppeteer = require("puppeteer");
const express = require("express");
// NOTE: you can not use ES6 here, node doesn't work with it unless you have a ton of babel boilerplate.
const app = express();

app.get("/information", async (req, res) => {
  console.log("runnning information endpoint");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(req.query.url); // URL is given by the "user" (your client-side application)

  const items = await page.$$(".mainText");
  const sum = await page.$$(".summary");
  //   const [advices] = await page.$x(
  //     "/html/body/div[4]/div/div/div/div[1]/div[1]/div/div[1]/article[2]/div[7]/main/div/div[1]/div[5]/div/ol/li[1]/div/div[2]/div[2]/div[5]/p[2]"
  //   );

  years_worked = [];
  summaries = [];

  for (let i = 0; i < items.length; i++) {
    const item = await (await items[i].getProperty("innerText")).jsonValue();
    console.log(item);
    years_worked.push(item);
  }

  for (let i = 0; i < sum.length; i++) {
    const item = await (await sum[i].getProperty("innerText")).jsonValue();
    console.log(item);
    summaries.push(item);
  }

  res.send({ years_worked, summaries });

  await browser.close();
});

app.listen(4000, () => console.log("running"));
