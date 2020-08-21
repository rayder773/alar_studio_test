import '../styles/first.scss';

const canvasBig = document.getElementById("canvas-big");
const canvasSmall = document.getElementById("canvas-small");
const ctx = canvasBig.getContext("2d");

function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  const star = new Path2D();

  star.moveTo(cx, cy - outerRadius)
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    star.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    star.lineTo(x, y)
    rot += step
  }

  ctx.fillStyle = color;
  ctx.fill(star);
}

const colors = ['red', 'blue', 'green', 'yellow', 'black'];
const cy = 100;
const spikes = 5;
const outerRadius = 30;
const innerRadius = 15;

for(let i = 0; i < 5; i++) {
  const color = colors[i];
  const cx = (100 * i) + 100;
  drawStar(cx, cy, spikes, outerRadius, innerRadius, color)
}

canvasBig.addEventListener('click', function(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  const rgba = ctx.getImageData(x, y, 1, 1).data;
  
  canvasSmall.style.background = `rgba(${rgba.join(', ')})`;
});