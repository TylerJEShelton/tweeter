/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const renderTweets = tweets => {
    console.log(tweets);
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

  $("form").submit(function(event) {
    event.preventDefault();
    const form = $(this);
    $.ajax({
      url: "/tweets",
      type: "POST",
      data: form.serialize(),
    });
  });

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        renderTweets(tweets);
        //$button.replaceWith(morePostsHtml);
      });

  };

  // Call loadTweets to load all the tweets from the database

  loadTweets();
});