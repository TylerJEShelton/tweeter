const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  console.log(div.innerHTML);
  return div.innerHTML;
};

module.exports = escape;