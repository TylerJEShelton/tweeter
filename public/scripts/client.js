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
      $('#tweets-container').prepend($tweet);
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

    //show alert if the user tries to tweet a blank tweet
    if (!$("#tweet-text").first().val()) {
      alert("Please enter contents you'd like to tweet!");
      return;
    }

    // Show alert if the user tries to tweet when the characters are over the max count
    if ($("#tweet-text").first().val().length > 140) {
      alert("Please keep your tweet less than 140 characters!");
      return;
    }

    $.ajax({
      url: "/tweets",
      type: "POST",
      data: form.serialize(),
    }).then(function() {
      $("#tweet-text").first().val("");
      $(".counter").first().val(140);
      loadTweets();
    });
  });

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        renderTweets(tweets);
      });

  };

  // Call loadTweets to load all the tweets from the database

  loadTweets();
});