# React Movie Library App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a react app which creates a GUI for a list of movies with the following major features:
- reads data from a google sheet
- displays movies posters from [The Movie Database](https://tmdb.org) 
- search by title
- filter by movie runtime
- filter by format

Development notes:
- The .env file lets me make variables used by node and web pack accessible through `process.env.VARIABLENAME` in 
  javascript based on [this stackoverflow post](https://stackoverflow.com/questions/45978230/get-version-number-from-package-json-in-react-redux-create-react-app)
  but the .env variables are only refreshed when the dev server restarts. 