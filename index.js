const puppeteer = require("puppeteer");
const fs = require("fs");

async function main() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto("https://www.hyundai-motor.ro/elantra-nou");

  let myElement = await page.$x(
    "/html/body/div[2]/div[10]/div[17]/div[2]/table/tbody/tr[3]/td[5]"
  );

  let text = await (await myElement[0].getProperty("innerText")).jsonValue();

  let time = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    return (today = mm + "/" + dd + "/" + yyyy);
  };

  // await page.screenshot({ path: "./myPage.png" });

  fs.writeFileSync("./MyData.txt", `${time()}  ${text}`);

  console.log(text);
}

main();
