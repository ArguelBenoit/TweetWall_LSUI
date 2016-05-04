import connect from 'tweetping-connect';
import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import wallReducer from 'redux-ping/lib/reducers/wall';
import { aggregate, setSize, fetchHistory } from 'redux-ping/lib/actions/wall';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import TweetWall from './TweetWall.jsx';
import {parse as parseQuery} from 'querystring';


const reducers = {
  wall: wallReducer
};

const store = createStore(combineReducers(reducers), undefined, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.dispatch(setSize(55));

setTimeout(() => {
  store.dispatch(fetchHistory('d8eeba3a', {}));
});

connect('d8eeba3a', 'wall', (post) => {
  store.dispatch(aggregate(post));
}, 'wss://tweetping.net/');

ReactDOM.render(<Provider store={store}>
  <div>
    <TweetWall />
  </div>
</Provider>, document.getElementById('content'));