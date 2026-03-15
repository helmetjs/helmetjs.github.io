var copyTimeouts = new Map();

function addCopyButtons() {
  var codeEls = document.querySelectorAll(
    'code[class*="language-javascript"], code[class*="language-js"]'
  );

  for (var i = 0; i < codeEls.length; i++) {
    var pre = codeEls[i].parentElement;
    if (!pre || pre.tagName !== "PRE") continue;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "copy-button";
    button.setAttribute("aria-label", "Copy code to clipboard");
    pre.style.position = "relative";
    pre.appendChild(button);

    button.addEventListener("click", handleCopy);
  }
}

function handleCopy(event) {
  var button = event.currentTarget;
  var pre = button.parentElement;
  var code = pre.querySelector("code");
  var text = code.textContent;

  var existingTimeout = copyTimeouts.get(button);
  if (existingTimeout) {
    clearTimeout(existingTimeout);
    copyTimeouts.delete(button);
  }

  button.className = "copy-button";

  navigator.clipboard.writeText(text).then(
    function () {
      button.className = "copy-button copied";
      var timeout = setTimeout(function () {
        button.className = "copy-button";
        copyTimeouts.delete(button);
      }, 2000);
      copyTimeouts.set(button, timeout);
    },
    function () {
      button.className = "copy-button failed";
      var timeout = setTimeout(function () {
        button.className = "copy-button";
        copyTimeouts.delete(button);
      }, 2000);
      copyTimeouts.set(button, timeout);
    }
  );
}

addCopyButtons();
