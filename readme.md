# Rakuten frontend test
Ginés Ortiz Saez

## How to run the project
```
npm i
npm start
```


## Run Cypress tests
With visual interface
```
npm run test
```

With command line interface
```
npm run test-run
```

## About the test
- I've used `react-scripts` in order to launch the project, but I haven't use a create-react-app base or similar.
- Instead of using `redux` I'm using `context` hooks simply because its one less dependency and works literally as good 
as Redux does
- For styles, I've used SCSS with `node-sass` instead of `styled-components` just because its faster for developing a 
test
- All tests are Integration tests using `Cypress` because the logic of each component its not complex or with a ton of 
cases where unit testing will come more handy

## Extra explanation
The app is using the context to store the collections requested so when you go back to the home, all the information is
already ready. 
When requesting the different collections, the basic information that comes for each movie its stored on the 
context and used as an appShell for the movie page. This way the user gets immediate information displaying the cover 
and some details. Then the full content its requested and stored on the same place with a flag to mark it as "full data"

When the user moves on the collection slider, the position gets stored on the context so when coming back to the home, 
the user can continue on the exact same position. This is done for each slider independently.
