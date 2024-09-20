const fs = require('fs');
import { test, expect } from '@playwright/test';
import { HelloWorldPage } from '../../pages/Visual-Exercise/helloWorldPage';


test('compare base screenshot with current screenshot', async ({ page }) => {
  const helloWorld = new HelloWorldPage(page);
  await helloWorld.goToHelloWorldPage(page);
  const baseImage = await helloWorld.takeBaseScreenShot();
  const currentImage = await helloWorld.takeCurrentScreenShot();
  const baseBuffer = fs.readFileSync(baseImage);
  const currentBuffer = fs.readFileSync(currentImage);
  expect(baseBuffer).toEqual(currentBuffer, 'Screenshots are not the same');

});
test('compare diff2 screenshot with base screenshot', async ({ page }) => {
  const helloWorld = new HelloWorldPage(page);
  await helloWorld.goToHelloWorldPage(page);
  const baseImage = await helloWorld.takeBaseScreenShot();
  const baseBuffer = fs.readFileSync(baseImage);
  await helloWorld.clickDiff2Btn();
  const currentURL = await helloWorld.getCurrentURL()
  expect(currentURL).toEqual("https://applitools.com/helloworld/?diff2");
  const currentImageForDiff2 = await helloWorld.takeCurrentScreenShot();
  const currentBufferForDiff2 = fs.readFileSync(currentImageForDiff2);
  expect(baseBuffer).toEqual(currentBufferForDiff2, 'Screenshots are not the same');
});
test('compare click me button section', async ({ page }) => {
  const helloWorld = new HelloWorldPage(page);
  await helloWorld.goToHelloWorldPage(page);
  const screenshotBeforeClick = await helloWorld.takeScreenShotForElementBtnSection("beforeClickScreenshot");
  const baseBuffer = fs.readFileSync(screenshotBeforeClick);
  await helloWorld.clickOnClickMeBtn();
  const screenshotAfterClick = await helloWorld.takeScreenShotForElementBtnSection("AfterClickScreenshot");
  const afterClickBuffer = fs.readFileSync(screenshotAfterClick);
  expect(baseBuffer).not.toEqual(afterClickBuffer, 'Screenshots are different');
});