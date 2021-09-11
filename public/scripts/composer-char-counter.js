$(document).ready(function() {

  const maxChars = 140;
  console.log("Working!");

  // $("#btn").on('click', function() {
  //   console.log(this); //The this keyword is a reference to the button
  // });

  // $("#btn").on('click', () => {
  //   console.log(this); //The this keyword here refers to something else!
  // });

  $("#tweet-text").on("input", function() {
    const counter = $($(this).parent().children("div.button-chars")[0]).children()[1];
    const textLength = this.value.length;
    if (maxChars - textLength < 0) {
      counter.style.color = "red";
    }
    counter.value = maxChars - textLength;

  });

  // blur event
  // keydown event
  // keyup event
  // keypress event
  // X change event
  // input event
});