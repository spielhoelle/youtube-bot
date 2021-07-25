const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: null,
    args: ['--no-sandbox']
  })
  let shouldReset = false
  const resetTime = 2700000
  const tickTime = 2000
  setInterval(() => {
    shouldReset = true
  }, resetTime);

  setInterval(async () => {
    if (shouldReset) {
      console.log(`Restart watchin videos after ${resetTime / 1000 / 60} min`)
      shouldReset = false
      let pages = await browser.pages();
      for (var k in pages) {
        pages[k].close();
      }
      watchVideos()
    }
  }, tickTime);
  const openTabs = 20
  const url = [
    "https://www.youtube.com/watch?v=Lg4R-Sy32Y4&list=UU1biOzfLe10-1lNgrWtgJag&index=1",
    "https://www.youtube.com/watch?v=rnL3H3G9dLk&list=UU1biOzfLe10-1lNgrWtgJag&index=2",
    "https://www.youtube.com/watch?v=rVjj3vib6ek&list=UU1biOzfLe10-1lNgrWtgJag&index=3",
    "https://www.youtube.com/watch?v=e2nxZ6QloGo&list=UU1biOzfLe10-1lNgrWtgJag&index=4",
    "https://www.youtube.com/watch?v=FuYKnoUIceU&list=UU1biOzfLe10-1lNgrWtgJag&index=5",
    "https://www.youtube.com/watch?v=93_NS5M8wfw&list=UU1biOzfLe10-1lNgrWtgJag&index=6",
    "https://www.youtube.com/watch?v=DlyKt7DDLMw&list=UU1biOzfLe10-1lNgrWtgJag&index=7",
    "https://www.youtube.com/watch?v=Z2W7SGxltV0&list=UU1biOzfLe10-1lNgrWtgJag&index=8",
    "https://www.youtube.com/watch?v=XfPfPHh5re8&list=UU1biOzfLe10-1lNgrWtgJag&index=9",
    "https://www.youtube.com/watch?v=Ry5OklkBH_g&list=UU1biOzfLe10-1lNgrWtgJag&index=10",
    "https://www.youtube.com/watch?v=8vcaE5qSNsA&list=UU1biOzfLe10-1lNgrWtgJag&index=11",
    "https://www.youtube.com/watch?v=MwPWmY11KII&list=UU1biOzfLe10-1lNgrWtgJag&index=12",
    "https://www.youtube.com/watch?v=25FzSYLwpG0&list=UU1biOzfLe10-1lNgrWtgJag&index=13",
    "https://www.youtube.com/watch?v=1S29ycRr8FM&list=UU1biOzfLe10-1lNgrWtgJag&index=14",
    "https://www.youtube.com/watch?v=Rjn-usFFt-A&list=UU1biOzfLe10-1lNgrWtgJag&index=15",
    "https://www.youtube.com/watch?v=5Ae7PN-6xsg&list=UU1biOzfLe10-1lNgrWtgJag&index=16",
    "https://www.youtube.com/watch?v=6EigKrWuNlM&list=UU1biOzfLe10-1lNgrWtgJag&index=17",
    "https://www.youtube.com/watch?v=jmD6ezb5Udo&list=UU1biOzfLe10-1lNgrWtgJag&index=18",
    "https://www.youtube.com/watch?v=enePCFETxJQ&list=UU1biOzfLe10-1lNgrWtgJag&index=19",
    "https://www.youtube.com/watch?v=nRbwOux3EP0&list=UU1biOzfLe10-1lNgrWtgJag&index=20",
    "https://www.youtube.com/watch?v=4dUqpCHGATg&list=UU1biOzfLe10-1lNgrWtgJag&index=21",
    "https://www.youtube.com/watch?v=qrK-xKs7LzU&list=UU1biOzfLe10-1lNgrWtgJag&index=22",
    "https://www.youtube.com/watch?v=KI3UOvQFuZU&list=UU1biOzfLe10-1lNgrWtgJag&index=23",
    "https://www.youtube.com/watch?v=Femy9eA1nj0&list=UU1biOzfLe10-1lNgrWtgJag&index=24",
    "https://www.youtube.com/watch?v=Wexhspgb32k&list=UU1biOzfLe10-1lNgrWtgJag&index=25",
    "https://www.youtube.com/watch?v=ATyNFUN856M&list=UU1biOzfLe10-1lNgrWtgJag&index=26",
    "https://www.youtube.com/watch?v=D5SFwOv_TJo&list=UU1biOzfLe10-1lNgrWtgJag&index=28",
    "https://www.youtube.com/watch?v=XOKL0jPsB4s&list=UU1biOzfLe10-1lNgrWtgJag&index=29",
    "https://www.youtube.com/watch?v=yS2EmpPoMbE&list=UU1biOzfLe10-1lNgrWtgJag&index=30"
  ]
  const watchVideos = async () => {
    console.log(`Starting to watch ${openTabs} videos`);
    var videos = []
    for(var i = 0; videos.length < openTabs; i++){
      videos = [...videos, ...url]
    }
    videos = videos.splice(0, openTabs).slice().sort(() => Math.random() - 0.5)
    for (var i = 0; i < videos.length; i++) {
      try {
        const page = await browser.newPage();
        await page.goto(videos[i], { waitUntil: 'networkidle2' });
        page.waitForNavigation()
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
