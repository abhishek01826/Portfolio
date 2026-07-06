document.getElementById('year').textContent = new Date().getFullYear();

// Terminal typing effect
const body = document.getElementById('terminalBody');
const outputLines = [
  "Frontend Developer",
  "Stack: React · JavaScript · HTML · CSS · Node.js",
  "Status: Open to work ✓"
];

function typeLine(text, container, speed = 28) {
  return new Promise(resolve => {
    let i = 0;
    const span = document.createElement('div');
    span.className = 'line output';
    container.appendChild(span);
    const interval = setInterval(() => {
      span.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

async function runTerminal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    outputLines.forEach(t => {
      const d = document.createElement('div');
      d.className = 'line output';
      d.textContent = t;
      body.appendChild(d);
    });
    return;
  }
  for (const line of outputLines) {
    await typeLine(line, body);
  }
  const cursorLine = document.createElement('div');
  cursorLine.className = 'line';
  cursorLine.innerHTML = '<span class="prompt">➜</span> <span class="path">~/portfolio</span> <span class="cursor"></span>';
  body.appendChild(cursorLine);
}

// Trigger once hero is visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runTerminal();
      observer.disconnect();
    }
  });
});
observer.observe(document.querySelector('.terminal'));
