## Parks in Phoenix (Neighboorhood Map) Project

### Getting Started 
## How to Install

# Fork or Clone
Clone or download https://github.com/JimAlanMcB/neighboorhood-app.git

* install all project dependencies with `npm install`
* start the development server with `npm start`

# Dependencies 
 Listed in package.json

# Dependencies for Py getLocData Script
1. Python 3.0
2. Selenium
3. Figlet
4. parks20171024.csv or any CSV downloaded from your parks department. 

# API for Locations

- API KEYS
- address, lat, lng, name, reviews, stars, url

https://github.com/JimAlanMcB/api 

# Built With
1. React JS
2. API Built with Python 

# Author
Jim Alan McBrayer
# Acknowledgments
Udacity, Google because I scraped all of the info from there. 

### Offline-First Considerations

1. Service workers [require HTTPS](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers#you_need_https),
although to facilitate local testing, that policy
[does not apply to `localhost`](http://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http/34161385#34161385).
If your production web server does not support HTTPS, then the service worker
registration will fail, but the rest of your web app will remain functional.

1. Service workers are [not currently supported](https://jakearchibald.github.io/isserviceworkerready/)
in all web browsers. Service worker registration [won't be attempted](src/registerServiceWorker.js)
on browsers that lack support.

1. The service worker is only enabled in the [production environment](#deployment),
e.g. the output of `npm run build`. It's recommended that you do not enable an
offline-first service worker in a development environment, as it can lead to
frustration when previously cached assets are used and do not include the latest
changes you've made locally.

1. If you *need* to test your offline-first service worker locally, build
the application (using `npm run build`) and run a simple http server from your
build directory. After running the build script, `create-react-app` will give
instructions for one way to test your production build locally and the [deployment instructions](#deployment) have
instructions for using other methods. *Be sure to always use an
incognito window to avoid complications with your browser cache.*