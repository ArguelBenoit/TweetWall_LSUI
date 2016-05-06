import React, {PropTypes} from 'react';
import formatTweetText from './formatter';

const Tweet = (props) => {
  const userUrl = `https://twitter.com/${props.user.name}`;
  const tweetUrl = userUrl + '/status/' + props.id;
  const text = formatTweetText(props.text, props.entities);
  const profilePicture = props.pictureSize ?
    props.user.profile_picture.replace('_normal', '_' + props.pictureSize) :
    props.user.profile_picture;

  function getTweetText() {
    return {__html: text};
  }

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

  const styleOnetweet = {
    width: widthTweet,
    height: heightTweet,
    margin: 3
  }
  const styleTxt = {
    height: heightTweet
  }
  const stylePicture = {
    marginTop: ( heightTweet - 48 ) / 2
  }
  const styleA = {
    width: widthTweet,
    height: heightTweet
  }

  return <div className="onetweet" style={styleOnetweet}>
    <a href={tweetUrl} target="_blank" className="main-a" style={styleA}></a>
    <div className="tweet">
      <div className="picture" style={stylePicture}>
        <img src={profilePicture}/>
      </div>
      <img className="arrowsvg" src="img/arrow.svg" width="30px" height={heightTweet} />
      <div id="txt" style={styleTxt} className="txt">
        <p className="name"><a href={userUrl} target="_blank">@{props.user.name}</a>
        </p>
        <p className="text" dangerouslySetInnerHTML={getTweetText()}/>
      </div>
    </div>
  </div>;
};

Tweet.propTypes = {
  index: PropTypes.number,
  pictureSize: PropTypes.string,
  user: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  text: PropTypes.string
};
export default Tweet;
