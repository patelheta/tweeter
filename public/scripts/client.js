/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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
    "created_at": 1461116232227
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
    "created_at": 1461113959088
  }
];

const calculateDaysAgo = function(date) {
  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();

  const diffDays = Math.round(Math.abs((date - today) / oneDay));
  return diffDays;
};
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
      <p>${calculateDaysAgo(tweet.created_at)} days ago</p>
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
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#allTweets').append($tweet);
  }
};

renderTweets(data);