/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {


  const createTweetElement = function(tweet) {
    const tweetArticle = $(`
  <article class="tweet">
    <header>
      <img src=${tweet.user.avatars} alt="avatar" />
      <h4>${tweet.user.name}</h4>
      <p class="handle">${tweet.user.handle}</p>
    </header>

    <p class="content">${tweet.content.text}</p>

    <footer>
      <p>${timeago.format(tweet.created_at)}</p>
      <p>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-sharp fa-solid fa-heart"></i>
      </p>
    </footer>
  </article>`);
    return tweetArticle;
  };

  const renderTweets = function(tweets) {
    tweets = tweets.reverse();
    $("#allTweets").empty();

    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#allTweets').append($tweet);
    }
  };

  $("#tweetForm").submit(function(event) {
    event.preventDefault();
    let text = $("#tweet-text").val();
    if (text.length <= 0) {
      alert("Please enter text message");
      return;
    } else if (text.length > 140) {
      alert("Text must not exceed 140 characters");
      return;
    }
    let data = $(this).serialize();
    $.post("/tweets/",
      data,
      function(data) {
        $("#tweet-text").val('');
        loadtweets();
      });
  });

  const loadtweets = function() {
    $.ajax("/tweets", { method: "GET" }).then(function(data) {
      renderTweets(data);
    });
  };

  loadtweets();
});
