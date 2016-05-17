import connect from 'tweetping-connect';
import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import wallReducer from 'redux-ping/lib/reducers/wall';
import { aggregate, setSize, fetchHistory } from 'redux-ping/lib/actions/wall';
import ReactDOM from 'react-dom';
import React from 'react';
import TweetWall from './TweetWall.jsx';
import debounce from 'lodash';

const streamId = 'nutella';
const hostName = 'hq.tweetping.net';

const reducers = {
  wall: wallReducer
};

const store = createStore(combineReducers(reducers), undefined, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var mainHeight = 110;
var mainWidth = 500;
var widthViewport = window.innerWidth;
var heightViewport = window.innerHeight;

var twNbrHeightFir = ( heightViewport / mainHeight );
var twNbrHeight = Math.round(twNbrHeightFir);
var heightTweet = ( heightViewport / twNbrHeight ) - 8;

var twNbrWidthFir = ( widthViewport / mainWidth );
var twNbrWidth = Math.round(twNbrWidthFir);
var tweetNumber = twNbrHeight*twNbrWidth;
var widthTweet = ( widthViewport / twNbrWidth ) - 8;

store.dispatch(setSize(twNbrHeight*twNbrWidth));

function reSize() {

  var widthViewport = window.innerWidth;
  var heightViewport = window.innerHeight;

  var twNbrHeightFir = ( heightViewport / mainHeight );
  var twNbrHeight = Math.round(twNbrHeightFir);
  var heightTweet = ( heightViewport / twNbrHeight ) - 8;

  var twNbrWidthFir = ( widthViewport / mainWidth );
  var twNbrWidth = Math.round(twNbrWidthFir);
  var widthTweet = ( widthViewport / twNbrWidth ) - 8;

  if ( twNbrHeight*twNbrWidth > tweetNumber ) {
    store.dispatch(setSize(twNbrHeight*twNbrWidth));
    setTimeout(() => {
      store.dispatch(fetchHistory(streamId, {
        hostname: hostName
      }));
    });
  }

  ReactDOM.render(
    <TweetWall widthTweet={widthTweet} heightTweet={heightTweet} />,
    document.getElementById('widget')
  );
}

window.addEventListener('resize', debounce(reSize, 150));

setTimeout(() => {
  store.dispatch(fetchHistory(streamId, {
    hostname: hostName
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