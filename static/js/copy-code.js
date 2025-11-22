document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(
    "pre > code.language-js, pre > code.language-javascript"
  );

  const COPY_SVG = `
<span aria-hidden="true" class="copy-icon">
  <svg viewBox="0 0 28 28" fill="currentColor">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 
        0-2 .9-2 2v16c0 1.1.9 2 2 2h11c1.1 0 2-.9 
        2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z" />
  </svg>
</span>
`;

  const CHECK_SVG = `
<span aria-hidden="true" class="check-icon">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 
      21 7l-1.41-1.41z" />
  </svg>
</span>
`;

  function setButtonState(btn, iconHTML, srText) {
    btn.innerHTML = `
      ${iconHTML}
      <span class="sr-only">${srText}</span>
    `;
    btn.setAttribute("aria-label", srText);
  }

  blocks.forEach((code) => {
    const pre = code.parentElement;

    let wrapper = pre.parentElement;
    if (!wrapper.classList.contains("code-block-wrapper")) {
      wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      pre.replaceWith(wrapper);
      wrapper.appendChild(pre);
    }

    const btn = document.createElement("button");
    btn.className = "copy-code-button";
    setButtonState(btn, COPY_SVG, "Copy code");

    wrapper.appendChild(btn);

    let resetTimeout = null;
    let isCooling = false;

    btn.addEventListener("click", async () => {
      if (isCooling) return;
      isCooling = true;

      try {
        await navigator.clipboard.writeText(code.innerText.trim());
        setButtonState(btn, CHECK_SVG, "Copied");
      } catch {
        setButtonState(btn, COPY_SVG, "Copy code");
      }

      if (resetTimeout) clearTimeout(resetTimeout);

      resetTimeout = setTimeout(() => {
        setButtonState(btn, COPY_SVG, "Copy code");
        isCooling = false;
        resetTimeout = null;
      }, 1000);
    });
  });
});
