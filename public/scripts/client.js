/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const renderTweets = tweets => {
    // loops through the tweets database to pass through each tweet into createTweetElement which builds the tweet in order to append it to the tweets container in index.html
    tweets.forEach(tweetData => {
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    });
  };

  const createTweetElement = tweetData => {
    // builds the tweet article using the tweetData
    const tweet =
      `<article class="tweet">
        <header>
          <div class="left-head-tweet">
            <img src="${tweetData.user.avatars}">
            ${tweetData.user.name}
          </div>
          <div class="right-head-tweet">
          ${tweetData.user.handle}
          </div>
        </header>
        <div class="tweet-body">
        ${tweetData.content.text}
        </div>
        <footer>
          <div class="left-foot-tweet">
            ${timeago.format(tweetData.created_at)}
          </div>
          <div class="right-foot-tweet">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`;
    return tweet;
  };

  // Test Data and Call

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1631896232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1631891832227
    }
  ]

  renderTweets(data);

});