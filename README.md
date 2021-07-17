# Youtube watchtime bot
The script opens the urls in a headless chrome, clicks on `play` and on `shuffle`. Preferable add youtube playlist links since the bot is restarting after 45 minutes and watches what youtube serves next.

Change the urls to your own youtube videos in `index.js:25`


## Installation without Docker
- npm i
- run the script with node index.js

## Installation with Docker
- docker-compose up