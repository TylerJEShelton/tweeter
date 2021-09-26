/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = tweets => {
    if (!Array.isArray(tweets)) {
      // if only a single tweet is passed
      const $tweet = createTweetElement(tweets);
      $('#tweets-container').prepend($tweet);
    } else {
      // loops through the tweets database to pass through each tweet into createTweetElement which builds the tweet in order to append it to the tweets container in index.html
      tweets.forEach(tweetData => {
        const $tweet = createTweetElement(tweetData);
        $('#tweets-container').prepend($tweet);
      });
    }
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
        ${escape(tweetData.content.text)}
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

    //show error if the user tries to tweet a blank tweet
    if (!$("#tweet-text").first().val()) {
      $("#errors").text("🚫 Please enter contents before tweeting! Tweets cannot be blank! 🚫");
      $("#errors").slideDown(200);

      return;
    }

    // Show error if the user tries to tweet when the characters are over the max count
    if ($("#tweet-text").first().val().length > 140) {
      $("#errors").text("🚫 Please keep your tweet less than 140 characters! 🚫");
      $("#errors").slideDown(200);
      return;
    }


    $.ajax({
      url: "/tweets",
      type: "POST",
      data: form.serialize(),
    }).then(function() {
      $("#errors").slideUp(200);
      $("#tweet-text").first().val("");
      $(".counter").first().val(140);
      $.ajax('/tweets', { method: 'GET' })
        .then(function(tweets) {
          renderTweets(tweets[tweets.length - 1]);
        });
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