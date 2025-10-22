// modified from https://github.com/Jieiku/abridge/blob/master/static/js/codecopy.js

const changeStatus = (copyStatus, result) => {
  if (result === "yes") {
    copyStatus.style.transition = "opacity 0s";
    copyStatus.style.opacity = "1";
    copyStatus.style.color = "var(--success)"; // or use a CSS variable
  } else if (result === "err") {
    copyStatus.style.opacity = "1";
    copyStatus.style.color = "var(--fail)"; // or use a CSS variable
  }
  setTimeout(() => {
    copyStatus.style.transition = "opacity 0.8s ease-in";
    copyStatus.style.opacity = "0"; // Fade out
  }, 250);
};

const copyCodeAndChangeText = (copyStatus, block) => {
  const code = block.querySelector('code') || block;
  const text = code.innerText || code.textContent;

  navigator.clipboard.writeText(text).then(() => {
    changeStatus(copyStatus, "yes");
  }).catch(() => {
    changeStatus(copyStatus, "err");
  });
};

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll("pre").forEach((block) => {
    const container = document.createElement("div");
    container.className = "codecopy-container";
    
    const copyDiv = document.createElement("div");
    copyDiv.className = "codecopy-button";
    copyDiv.textContent = "copy";

    const copyStatus = document.createElement("div");
    copyStatus.className = "codecopy-status";
    copyStatus.textContent = "•";

    container.appendChild(copyStatus);
    container.appendChild(copyDiv);
    
    block.appendChild(container);
    copyDiv.addEventListener("click", () => copyCodeAndChangeText(copyStatus, block));
  });
});
