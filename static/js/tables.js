/**
 * QA Playground - Dynamic Tables JS Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('input-table-search');
  const tableBody = document.getElementById('tbody-automation-table');
  const selectAll = document.getElementById('check-select-all');
  const exportBtn = document.getElementById('btn-export-csv');

  if (searchInput && tableBody) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const rows = tableBody.querySelectorAll('tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
      });
    });
  }

  if (selectAll && tableBody) {
    selectAll.addEventListener('change', (e) => {
      const checkboxes = tableBody.querySelectorAll('.check-row-select');
      checkboxes.forEach(cb => cb.checked = e.target.checked);
      updateSelectedRowCount();
    });

    tableBody.addEventListener('change', (e) => {
      if (e.target.classList.contains('check-row-select')) {
        updateSelectedRowCount();
      }
    });
  }

  if (exportBtn && tableBody) {
    exportBtn.addEventListener('click', () => {
      let csv = 'ID,Name,Role,Status,Department\n';
      const rows = tableBody.querySelectorAll('tr');
      rows.forEach(row => {
        const cols = row.querySelectorAll('td');
        if (cols.length > 1) {
          const rowData = Array.from(cols).slice(1, -1).map(td => `"${td.textContent.trim()}"`).join(',');
          csv += rowData + '\n';
        }
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', 'qa_playground_table_data.csv');
      a.click();
      showQAToast('Table data exported to CSV successfully!', 'success');
    });
  }
});

function updateSelectedRowCount() {
  const checked = document.querySelectorAll('.check-row-select:checked');
  const badge = document.getElementById('badge-selected-rows-count');
  if (badge) {
    badge.textContent = `${checked.length} Selected`;
  }
}
