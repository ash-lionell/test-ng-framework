/*module.exports = function(){
  this.Given(/^user is on the app landing page$/i,()=>{
    console.log("hey")
    browser.sleep(5000);
    hello.world=3;
  })
};*/

const { defineSupportCode } = require("cucumber");

defineSupportCode(({setDefaultTimeout}) => {
    setDefaultTimeout(browser.params.timeouts.maxTimeout);
});

defineSupportCode(function({ Given, When, Then }) {

  Given(/user is on the Eat24 site/i, async ()=>{
    //browser.get("https://www.jetblue.com")
    await browser.get("https://www.eat24.com")
    //await browser.sleep(5000)
    //return expect(true).to.be.false;
    return await expect(element(by.xpath("//span[text()='Sign in']")).isDisplayed(),
        "User is not on Eat24 page.").to.eventually.be.true;
  })

  When(/user enters his "(.*)"/i, async (area)=>{
    await element(by.xpath("//input[@placeholder='Enter your address']")).sendKeys(area);
    let el=element(by.xpath("//a[@role='option'][contains(.,'OH')]"))
    await browser.wait(until.visibilityOf(el),3000)
    await el.click()
  })

  When(/selects Find Food/i, async ()=>{
    await element(by.xpath("//button[normalize-space()='Find food']")).click()
  })

  Then(/the food search results are displayed/i, async ()=>{
    let el=element(by.xpath("//h3[contains(@class,'no-results')]"))
    await browser.wait(until.visibilityOf(el),browser.params.timeouts.visibility)
    await expect(el.isDisplayed(),"Search results page was not displayed").to.eventually.be.true
  })
})

