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

const streamId = 'd8eeba3a';

const reducers = {
  wall: wallReducer
};

const store = createStore(combineReducers(reducers), undefined, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const heightViewport = window.innerHeight;
const widthViewport = window.innerWidth;
const mainHeight = 110;
const mainWidth = 500;

var twNbrHeightFir = ( heightViewport / mainHeight );
var twNbrHeight = Math.round(twNbrHeightFir);
const heightTweet = ( heightViewport / twNbrHeight ) - 8;

var twNbrWidthFir = ( widthViewport / mainWidth );
var twNbrWidth = Math.round(twNbrWidthFir);
const widthTweet = ( widthViewport / twNbrWidth ) - 8;

store.dispatch(setSize(twNbrHeight*twNbrWidth));

setTimeout(() => {
  store.dispatch(fetchHistory(streamId, {
    hostname: 'www.tweetping.net'
  }));
});

connect(streamId, 'wall', (post) => {
  store.dispatch(aggregate(post));
}, 'wss://tweetping.net/');

const attributes = {
  store,
  widthTweet,
  heightTweet
};

ReactDOM.render(
  <TweetWall {...attributes} />,
  document.getElementById('widget')
);