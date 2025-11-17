(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const blocks = document.querySelectorAll(
      "pre > code.language-js, pre > code.language-javascript"
    );

    blocks.forEach((code) => {
      const pre = code.parentElement;
      pre.style.position = "relative";

      const btn = document.createElement("button");
      btn.className = "copy-code-button";
      btn.innerHTML =
        '<span class="material-symbols-outlined">content_copy</span>';

      pre.appendChild(btn);

      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code.innerText.trim());
          btn.innerHTML =
            '<span class="material-symbols-outlined">check</span>';
          setTimeout(() => {
            btn.innerHTML =
              '<span class="material-symbols-outlined">content_copy</span>';
          }, 800);
        } catch (err) {
          btn.innerHTML =
            '<span class="material-symbols-outlined">error</span>';
          setTimeout(() => {
            btn.innerHTML =
              '<span class="material-symbols-outlined">content_copy</span>';
          }, 800);
        }
      });
    });
  });
})();