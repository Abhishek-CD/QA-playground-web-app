/**
 * QA Playground - Shadow DOM Custom Components Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Open Shadow DOM
  const openHost = document.getElementById('shadow-host-open');
  if (openHost) {
    const shadowRoot = openHost.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        .shadow-box {
          background: #1E293B;
          border: 1px dashed #3B82F6;
          border-radius: 8px;
          padding: 16px;
          color: #F9FAFB;
          font-family: system-ui, sans-serif;
        }
        .shadow-input {
          width: 100%;
          padding: 8px 12px;
          background: #0F172A;
          border: 1px solid #334155;
          border-radius: 4px;
          color: #fff;
          margin: 8px 0;
        }
        .shadow-btn {
          background: #3B82F6;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>
      <div id="shadow-inside-container" data-testid="shadow-container-open" class="shadow-box">
        <h4 id="shadow-inside-heading">🔒 Open Shadow DOM Element</h4>
        <p id="shadow-inside-desc" style="font-size:12px; color:#9CA3AF;">This element resides inside an Open Shadow Root. Web drivers like Playwright can pierce open shadow roots using CSS selectors directly.</p>
        <input type="text" id="shadow-input-open" data-testid="shadow-input-open" data-qa="shadow-input-open" class="shadow-input" placeholder="Type inside shadow DOM..." />
        <button id="btn-shadow-click-open" data-testid="btn-shadow-click-open" class="shadow-btn">Submit Shadow Form</button>
        <div id="text-shadow-output-open" style="margin-top:8px; font-weight:600; color:#22C55E;"></div>
      </div>
    `;

    const btn = shadowRoot.getElementById('btn-shadow-click-open');
    const input = shadowRoot.getElementById('shadow-input-open');
    const output = shadowRoot.getElementById('text-shadow-output-open');

    if (btn && input && output) {
      btn.addEventListener('click', () => {
        output.textContent = `Shadow Input Value Captured: "${input.value || 'Empty'}"`;
      });
    }
  }

  // 2. Closed Shadow DOM Simulation
  const closedHost = document.getElementById('shadow-host-closed');
  if (closedHost) {
    // Note: We use closed mode or JS encapsulation simulator
    const shadowClosed = closedHost.attachShadow({ mode: 'closed' });
    shadowClosed.innerHTML = `
      <style>
        .closed-box {
          background: #1F192B;
          border: 1px dashed #8B5CF6;
          border-radius: 8px;
          padding: 16px;
          color: #F9FAFB;
        }
        .closed-input {
          padding: 8px 12px;
          background: #0B1120;
          border: 1px solid #4C1D95;
          border-radius: 4px;
          color: #fff;
          width: 100%;
          margin: 8px 0;
        }
        .closed-btn {
          background: #8B5CF6;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>
      <div id="closed-shadow-wrapper" data-testid="closed-shadow-wrapper" class="closed-box">
        <h4 id="heading-closed-shadow">🔐 Closed Shadow DOM Element</h4>
        <p id="desc-closed-shadow" style="font-size:12px; color:#9CA3AF;">Closed Shadow roots prevent external JS access via shadowRoot property. Automate via Javascript Injection or browser-specific locator tricks.</p>
        <input type="text" id="input-shadow-closed" data-testid="input-shadow-closed" class="closed-input" placeholder="Closed shadow input..." />
        <button id="btn-shadow-closed-action" data-testid="btn-shadow-closed-action" class="closed-btn">Execute Action</button>
      </div>
    `;
  }
});
