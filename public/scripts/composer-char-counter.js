$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let text = $(this).val();
    let limit = 140 - text.length;
    let counterLabel = $(this).parents().find('.counter');
    counterLabel.val(limit);
    if (limit < 0) {
      counterLabel.css("color", "red");
    }
    else {
      counterLabel.css("color", "#55514a");
    }
  });
});
