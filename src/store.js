const { configureStore } = require("@reduxjs/toolkit");

const reducer = require("./reducers");

const store = configureStore({
  reducer,
  devTools: true,
});
module.exports = store;
