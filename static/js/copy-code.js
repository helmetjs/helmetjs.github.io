document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll("pre > code");

  const icons = {
    copy: `
      <svg viewBox="0 0 28 28">
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 
            0-2 .9-2 2v16c0 1.1.9 2 2 2h11c1.1 0 2-.9 
            2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z"/>
      </svg>
    `,
    check: `
      <svg viewBox="0 0 24 24">
        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 
          21 7l-1.41-1.41z"/>
      </svg>
    `
  };

  function setButtonState(btn, icon, label) {
    btn.innerHTML = icon;
    btn.setAttribute("aria-label", label);
  }

  codeBlocks.forEach(code => {
    const pre = code.parentElement;
    const wrapper = document.createElement("div");
    
    wrapper.className = "code-block-wrapper";
    pre.replaceWith(wrapper);
    wrapper.appendChild(pre);

    const button = document.createElement("button");
    button.className = "copy-code-button";
    setButtonState(button, icons.copy, "Copy code");

    wrapper.appendChild(button);

    let cooling = false;

    button.addEventListener("click", async () => {
      if (cooling) return;
      cooling = true;

      try {
        await navigator.clipboard.writeText(code.textContent.trim());
        setButtonState(button, icons.check, "Copied");
      } catch {
        setButtonState(button, icons.copy, "Copy code");
      }

      setTimeout(() => {
        setButtonState(button, icons.copy, "Copy code");
        cooling = false;
      }, 1000);
    });
  });
});
