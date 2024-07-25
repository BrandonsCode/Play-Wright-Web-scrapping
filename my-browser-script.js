const fs = require("fs/promises")
const { chromium, firefox, webkit } = require("playwright")

// async function screenshots() {
//     const browser = await chromium.launch()
//     const context = await browser.newContext()
//     const page = await context.newPage()

//     await page.goto("https://thrillartstattoos.com/")
//     await page.setViewportSize({ width: 1920, height: 1080 })
//     // await page.setViewportSize({ width: 640, height: 480 })
//     await page.screenshot({ path: `mobile-${new Date().getTime()}.png`, fullPage: true })
//     // await page.screenshot({ path: "mobile.png", fullPage: true })
//     await browser.close()
//     screenshots()
// }
async function getWeatherData() {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://www.weather.gov/ffc/")
    const [location] = await page.locator(".myfcst-location").allInnerTexts()
    
    const [temperature] = await page.locator("#myfcst-tempf").allInnerTexts()
    console.log(location)
    console.log(temperature)

    const ourObject = {
        location, temperature 
    }
    await fs.writeFile("ourWeather.json", JSON.stringify(ourObject))

    await browser.close()
}
getWeatherData()
