tic-tac-toe-ai
==============
A simple AI for the board game tic-tac-toe.

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
browserify ./App.js -o bundle.js
```

Using browserify with source maps:
```
browserify ./App.js -d -o bundle.js
```

For continuous building:
```
watchify ./App.js -o bundle.js
```

For continuous building with source maps:
```
watchify ./App.js -d -o bundle.js
```
