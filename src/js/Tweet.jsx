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

  const heightVp = window.innerHeight;
  const widthVp = window.innerWidth;
  const mainHeight = 120;
  const mainWidth = 400;

  var twNbrHeightFir = ( heightVp / mainHeight );
  var twNbrHeight = Math.round(twNbrHeightFir);
  const heightTweet = ( heightVp / twNbrHeight ) - 2;
  
  var twNbrWidthFir = ( widthVp / mainWidth );
  var twNbrWidth = Math.round(twNbrWidthFir);
  const widthTweet = ( widthVp / twNbrWidth ) - 2;

  const styleOnetweet = {
    width: widthTweet,
    height: heightTweet,
    margin: 1
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

  // var trololo = document.getElementById("txt").offsetHeight;
  // console.log(trololo);

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
  text: PropTypes.string,
  twNbrHeight: PropTypes.number,
  twNbrWidth: PropTypes.number
};

export default Tweet;
