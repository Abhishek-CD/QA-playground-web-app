/**
 * QA Playground - Global Core JavaScript
 * Handles sidebar toggles, search filtering, toasts, and UI handlers.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('QA Playground Core JS Initialized.');

  // Sidebar Mobile Toggle
  const toggleBtn = document.getElementById('btn-toggle-sidebar');
  const sidebar = document.getElementById('sidebar-main');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  // Sidebar Filter Search
  const sidebarSearch = document.getElementById('sidebar-search-input');
  const navItems = document.querySelectorAll('.sidebar-nav-item');

  if (sidebarSearch) {
    sidebarSearch.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase();
      navItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(val)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Auto Dismiss Toast Banners
  document.querySelectorAll('.btn-close-toast').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const banner = e.target.closest('.qa-toast-banner');
      if (banner) banner.style.display = 'none';
    });
  });
});

/**
 * Global Toast Notification Helper
 */
function showQAToast(message, type = 'info') {
  let toastContainer = document.getElementById('qa-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'qa-toast-container';
    toastContainer.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.id = 'toast-' + Date.now();
  toast.setAttribute('data-testid', 'toast-notification');
  toast.setAttribute('data-qa', 'toast-alert');
  toast.className = `qa-toast-item qa-toast-${type}`;
  toast.style.cssText = 'background:#111827;border:1px solid #1F2937;padding:12px 18px;border-radius:8px;box-shadow:0 10px 25px rgba(0,0,0,0.5);color:#fff;font-size:13.5px;min-width:280px;display:flex;align-items:center;justify-content:space-between;animation:fadeIn 0.3s ease;';

  const typeColor = type === 'success' ? '#22C55E' : type === 'error' ? '#EF4444' : type === 'warning' ? '#F59E0B' : '#3B82F6';
  toast.style.borderLeft = `4px solid ${typeColor}`;

  toast.innerHTML = `
    <span id="toast-text-${Date.now()}">${message}</span>
    <button id="btn-close-toast-${Date.now()}" style="background:none;border:none;color:#9CA3AF;cursor:pointer;font-size:16px;margin-left:12px;">&times;</button>
  `;

  toastContainer.appendChild(toast);

  const closeBtn = toast.querySelector('button');
  closeBtn.addEventListener('click', () => toast.remove());

  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 4000);
}
