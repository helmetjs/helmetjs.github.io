onhashchange = () => {
  // We'd prefer `const` but it's not supported by Hugo's build system.
  var id = location.hash.slice(1);
  var el = document.getElementById(id);
  if (el?.tagName === "DETAILS") el.setAttribute("open", true);
};

onhashchange();
