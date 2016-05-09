import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import wallSelector from 'redux-ping/lib/selectors/wall';
import Tweet from './Tweet.jsx';

const TweetWall = (props) => {
  const {heightTweet, widthTweet} = props;
  const tweets = props.wall;
  return <div className="wall container">
    {tweets.map((item, i) => <Tweet widthTweet={widthTweet} heightTweet={heightTweet} key={item._id} index={i} {...item} />)}
  </div>;
};

TweetWall.propTypes = {
  wall: PropTypes.any,
  viewport: PropTypes.object
};

export default connect(({wall, viewport}) => {
  return {
    wall: wallSelector.all(wall),
    viewport
  };
})(TweetWall);
