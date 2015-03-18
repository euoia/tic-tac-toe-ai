tic-tac-toe-ai
==============
A simple AI for the board game tic-tac-toe. Built for the browser with
ECMAScript 6 using [babel](https://babeljs.io/).

To install
----------
Install dependencies through npm
```
npm install
```

To build bundle.js
------------------
Using browserify:
```
browserify ./App.js -t babelify -o bundle.js
```

For continuous building with source maps:
```
watchify ./App.js -d -t babelify -o bundle.js
```
