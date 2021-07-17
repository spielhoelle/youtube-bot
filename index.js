const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: null,
    args: ['--no-sandbox']
  })
  let shouldReset = false
  const resetTime = 2700000
  setTimeout(() => {
    shouldReset = true
  }, resetTime);
  setInterval(async () => {
    if (shouldReset) {
      console.log(`Restart watchin videos after ${2700000 / 1000 / 60} min`)
      shouldReset = false
      let pages = await browser.pages();
      for (var k in pages) {
        pages[k].close();
      }
      watchVideos()
    }
  }, 5000);
  const url = [
    'https://www.youtube.com/watch?v=nRbwOux3EP0&list=UU1biOzfLe10-1lNgrWtgJag&index=20',
    'https://www.youtube.com/watch?v=rVjj3vib6ek&list=UU1biOzfLe10-1lNgrWtgJag&index=3',
    'https://www.youtube.com/watch?v=4dUqpCHGATg&list=UU1biOzfLe10-1lNgrWtgJag&index=22',
    'https://www.youtube.com/watch?v=XOKL0jPsB4s&list=UU1biOzfLe10-1lNgrWtgJag&index=29',
    'https://www.youtube.com/watch?v=Ry5OklkBH_g&list=UU1biOzfLe10-1lNgrWtgJag&index=11',
    'https://www.youtube.com/watch?v=MwPWmY11KII&list=UU1biOzfLe10-1lNgrWtgJag&index=12',
    'https://www.youtube.com/watch?v=WBbckX2hWpU&list=UU1biOzfLe10-1lNgrWtgJag&index=28',
    'https://www.youtube.com/watch?v=Lg4R-Sy32Y4&list=UU1biOzfLe10-1lNgrWtgJag&index=2',
  ];
  const watchVideos = async () => {
    const shuffledVideos = url.slice().sort(() => Math.random() - 0.5);
    for (var i = 0; i < shuffledVideos.length; i++) {
      try {
        console.log(`Starting to watch ${shuffledVideos[i]}`);
        const page = await browser.newPage();
        await page.goto(shuffledVideos[i], { waitUntil: 'networkidle2' });
        const navigationPromise = page.waitForNavigation()
        const elements = await page.$x('//*[@id="movie_player"]/div[4]/button')
        await elements[0].click()
        const elements2 = await page.$x("(//*//div[contains(@class, 'ytd-playlist-panel-renderer')]/*[@id=\"playlist-action-menu\"][1]//a)[2]")
        await elements2[0].click()
      } catch (e) {
        console.log(`Error`, e)
      }
    }
  }
  watchVideos()
})();
