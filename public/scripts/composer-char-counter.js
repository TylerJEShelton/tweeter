$(document).ready(function() {
  const maxChars = 140;

  $("#tweet-text").on("input", function() {
    const counter = $($(this).parent().children("div.button-chars")[0]).children()[1];
    const textLength = this.value.length;
    if (maxChars - textLength < 0) {
      counter.style.color = "red";
    } else {
      counter.style.color = "#545149";
    }
    counter.value = maxChars - textLength;
  });
});