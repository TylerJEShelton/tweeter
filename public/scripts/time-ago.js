$(document).ready(function() {
  let currentTime = timeago.format(new Date());
  $(".left-foot-tweet").html(currentTime)
});
