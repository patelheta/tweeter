/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


$(document).ready(function() {



  const createTweetElement = function(tweet) {
    const tweetArticle = $(`
  <article class="tweet">
    <header>
      <img src=${tweet.user.avatars} alt="avatar" />
      <h4>${tweet.user.name}</h4>
      <p class="handle">${tweet.user.handle}</p>
    </header>

    <p class="content">${escape(tweet.content.text)}</p>

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
      $(".alert .errorMessage").html("Please enter text message.");
      $(".alert").show();
      return;
    } else if (text.length > 140) {
      $(".alert .errorMessage").html("Text must not exceed 140 characters.");
      $(".alert").show();
      return;
    }
    let data = $(this).serialize();
    $.post("/tweets/",
      data,
      function(data) {
        $(".alert").hide();
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
