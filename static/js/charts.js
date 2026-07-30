/**
 * QA Playground - HTML5 Canvas Charts Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  drawBarChart('canvas-bar-chart');
  drawLineChart('canvas-line-chart');
  drawPieChart('canvas-pie-chart');
});

function drawBarChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.parentElement.clientWidth || 500;
  const height = canvas.height = 260;

  const data = [
    { label: 'Selenium', val: 85, color: '#3B82F6' },
    { label: 'Playwright', val: 95, color: '#8B5CF6' },
    { label: 'Cypress', val: 78, color: '#22C55E' },
    { label: 'Appium', val: 65, color: '#F59E0B' },
    { label: 'WebDriverIO', val: 72, color: '#EF4444' },
  ];

  ctx.clearRect(0, 0, width, height);

  const barWidth = 45;
  const gap = 35;
  const startX = 50;

  data.forEach((item, i) => {
    const x = startX + i * (barWidth + gap);
    const barHeight = (item.val / 100) * 170;
    const y = height - barHeight - 40;

    // Draw bar
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barHeight, 6);
    ctx.fill();

    // Draw value text
    ctx.fillStyle = '#F9FAFB';
    ctx.font = '600 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${item.val}%`, x + barWidth / 2, y - 8);

    // Draw label
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '500 11px Inter';
    ctx.fillText(item.label, x + barWidth / 2, height - 15);
  });
}

function drawLineChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.parentElement.clientWidth || 500;
  const height = canvas.height = 260;

  const points = [
    { month: 'Jan', val: 40 },
    { month: 'Feb', val: 65 },
    { month: 'Mar', val: 55 },
    { month: 'Apr', val: 85 },
    { month: 'May', val: 92 },
    { month: 'Jun', val: 120 },
  ];

  ctx.clearRect(0, 0, width, height);

  const padding = 50;
  const stepX = (width - padding * 2) / (points.length - 1);

  // Gradient fill under line
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
  gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

  ctx.beginPath();
  points.forEach((pt, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (pt.val / 140) * 160;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.lineTo(padding + (points.length - 1) * stepX, height - padding);
  ctx.lineTo(padding, height - padding);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Line
  ctx.beginPath();
  points.forEach((pt, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (pt.val / 140) * 160;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Dots
  points.forEach((pt, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (pt.val / 140) * 160;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#8B5CF6';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '500 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(pt.month, x, height - 20);
  });
}

function drawPieChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.parentElement.clientWidth || 400;
  const height = canvas.height = 260;

  const data = [
    { label: 'Passed', val: 70, color: '#22C55E' },
    { label: 'Failed', val: 15, color: '#EF4444' },
    { label: 'Skipped', val: 10, color: '#F59E0B' },
    { label: 'Flaky', val: 5, color: '#8B5CF6' },
  ];

  const total = data.reduce((acc, d) => acc + d.val, 0);
  const centerX = width / 2 - 40;
  const centerY = height / 2;
  const radius = 85;

  let currentAngle = -Math.PI / 2;

  data.forEach((item) => {
    const sliceAngle = (item.val / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = item.color;
    ctx.fill();
    currentAngle += sliceAngle;
  });

  // Legend
  const legendX = width - 110;
  data.forEach((item, i) => {
    const legendY = 60 + i * 28;
    ctx.fillStyle = item.color;
    ctx.fillRect(legendX, legendY, 14, 14);

    ctx.fillStyle = '#F9FAFB';
    ctx.font = '500 12px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(`${item.label} (${item.val}%)`, legendX + 22, legendY + 11);
  });
}
