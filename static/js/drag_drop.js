/**
 * QA Playground - Drag and Drop Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  // Draggable items
  const draggables = document.querySelectorAll('.qa-draggable-box, .kanban-card');
  const dropZones = document.querySelectorAll('.qa-drop-zone, .kanban-column');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
      draggable.classList.add('dragging');
      e.dataTransfer.setData('text/plain', draggable.id);
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const id = e.dataTransfer.getData('text/plain');
      const draggedElement = document.getElementById(id);
      if (draggedElement && zone) {
        zone.appendChild(draggedElement);
        showQAToast(`Moved item "${id}" into "${zone.id}"`, 'success');
      }
    });
  });
});
