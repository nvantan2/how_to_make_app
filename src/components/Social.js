import React from "react";
import "../styles/social.scss";

export default () => (
  <div className="social__wrapper js-fade-this fadeIn">
    <div className="social-buttons hidden-xs">
      <div
        className="fb-share-button fb_iframe_widget"
        data-href="http://howmuchtomakeanapp.com"
        data-layout="button"
        fb-xfbml-state="rendered"
        fb-iframe-plugin-query="app_id=299081770271318&container_width=60&href=http%3A%2F%2Fhowmuchtomakeanapp.com%2F&layout=button&locale=en_US&sdk=joey"
      >
        <span
          style={{ verticalAlign: "bottom", width: "67px", height: "20px" }}
        >
          <iframe
            name="f21cc0193fc8e04"
            width="1000px"
            height="1000px"
            data-testid="fb:share_button Facebook Social Plugin"
            title="fb:share_button Facebook Social Plugin"
            frameBorder={0}
            allowtransparency="true"
            allowFullScreen={true}
            scrolling="no"
            allow="encrypted-media"
            src="https://www.facebook.com/v2.4/plugins/share_button.php?app_id=299081770271318&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df3d790e852484c%26domain%3Dhowmuchtomakeanapp.com%26origin%3Dhttp%253A%252F%252Fhowmuchtomakeanapp.com%252Ff1f5192681c0bc%26relation%3Dparent.parent&container_width=60&href=http%3A%2F%2Fhowmuchtomakeanapp.com%2F&layout=button&locale=en_US&sdk=joey"
            style={{
              border: "none",
              visibility: "visible",
              width: "67px",
              height: "20px",
            }}
          />
        </span>
      </div>
      <iframe
        id="twitter-widget-0"
        scrolling="no"
        frameBorder={0}
        allowtransparency="true"
        allowFullScreen={true}
        className="twitter-share-button twitter-share-button-rendered twitter-tweet-button"
        style={{
          position: "static",
          visibility: "visible",
          width: "60px",
          height: "20px",
        }}
        title="Twitter Tweet Button"
        src="https://platform.twitter.com/widgets/tweet_button.c4b33f07650267db9f8a72eaac551cac.en.html#dnt=false&id=twitter-widget-0&lang=en&original_referer=http%3A%2F%2Fhowmuchtomakeanapp.com%2F&size=m&text=How%20much%20does%20it%20cost%20to%20make%20an%20app%3F%20%F0%9F%A4%94%20Find%20out%20in%20less%20than%20a%20minute%20%F0%9F%8E%89%20%23Howmuchtomakeanapp%20by%20%40z1digitalstudio&time=1594720653610&type=share&url=http%3A%2F%2Fhowmuchtomakeanapp.com%2F"
      />
    </div>
  </div>
);
