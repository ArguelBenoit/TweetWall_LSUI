import connect from 'tweetping-connect';
import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import wallReducer from 'redux-ping/lib/reducers/wall';
import { aggregate, setSize, fetchHistory } from 'redux-ping/lib/actions/wall';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import TweetWall from './TweetWall.jsx';
import Tweet from './Tweet.jsx';
import {parse as parseQuery} from 'querystring';

const streamId = 'nutella';//'d8eeba3a';

const reducers = {
  wall: wallReducer
};

const store = createStore(combineReducers(reducers), undefined, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.dispatch(setSize(55));

setTimeout(() => {
  store.dispatch(fetchHistory(streamId, {
    hostname: 'hq.tweetping.net'
  }));
});

connect(streamId, 'wall', (post) => {
  store.dispatch(aggregate(post));
  console.log(post);
}, 'wss://hq.tweetping.net/');



ReactDOM.render(<Provider store={store}>
  <div>
    <TweetWall />
  </div>
</Provider>, document.getElementById('content'));

