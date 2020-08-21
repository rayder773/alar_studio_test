import '../styles/first.scss';

var cnv = document.getElementById('canvas-big')
var ctx = cnv.getContext('2d')
// var deg = Math.PI / 180
DefinePaths(null)

function DefinePaths(event) {

  ctx.beginPath()
  ctx.moveTo(30, 70)
  ctx.bezierCurveTo(60, 70, 60, 0, 110, 70)
  if (event != null) {
    if (IsInPath(event)) SelStyle()
    else DifStyle()
  } else DifStyle()
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(200, 20)
  ctx.lineTo(250, 20)
  ctx.quadraticCurveTo(280, 20, 280, 40)
  ctx.lineTo(280, 80)
  ctx.quadraticCurveTo(260, 80, 250, 100)
  ctx.lineTo(200, 100)
  ctx.quadraticCurveTo(190, 80, 170, 80)
  ctx.lineTo(170, 40)
  ctx.quadraticCurveTo(170, 20, 200, 20)
  if (event != null) {
    if (IsInPath(event)) SelStyle()
    else DifStyle()
  } else DifStyle()
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(10, 130)
  ctx.lineTo(10, 200)
  ctx.lineTo(100, 200)
  if (event != null) {
    if (IsInPath(event)) SelStyle()
    else DifStyle()
  } else DifStyle()
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(220, 130)
  ctx.lineTo(170, 180)
  ctx.lineTo(220, 230)
  ctx.lineTo(270, 180)
  if (event != null) {
    if (IsInPath(event)) SelStyle()
    else DifStyle()
  } else DifStyle()
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

function IsInPath(event) {
  var bb, x, y
  bb = cnv.getBoundingClientRect()
  x = (event.clientX - bb.left) * (cnv.width / bb.width)
  y = (event.clientY - bb.top) * (cnv.height / bb.height)
  return ctx.isPointInPath(x, y)
}

function SelStyle() {
  ctx.lineWidth = 2
  ctx.strokeStyle = "brown"
  ctx.fillStyle = "cyan"
}

function DifStyle() {
  ctx.lineWidth = 2
  ctx.fillStyle = "gray"
  ctx.strokeStyle = "darkblue"
}

cnv.onclick = DefinePaths;

//
// const canvasBig = document.getElementById("canvas-big");
// const ctx = canvasBig.getContext("2d");
//
// function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
//   let rot = Math.PI / 2 * 3;
//   let x = cx;
//   let y = cy;
//   const step = Math.PI / spikes;
//
//   ctx.strokeSyle = "#000";
//   ctx.beginPath();
//   ctx.moveTo(cx, cy - outerRadius)
//   for (let i = 0; i < spikes; i++) {
//     x = cx + Math.cos(rot) * outerRadius;
//     y = cy + Math.sin(rot) * outerRadius;
//     ctx.lineTo(x, y)
//     rot += step
//
//     x = cx + Math.cos(rot) * innerRadius;
//     y = cy + Math.sin(rot) * innerRadius;
//     ctx.lineTo(x, y)
//     rot += step
//   }
//
//   ctx.fillStyle = color;
//   ctx.fill();
//   // ctx.addHitRegion({id: color})
// }
//
// const colors = ['red', 'blue', 'green', 'yellow', 'black'];
// const cy = 100;
// const spikes = 5;
// const outerRadius = 30;
// const innerRadius = 15;
//
// for(let i = 0; i < 5; i++) {
//   const cx = (100 * i) + 100;
//   const color = colors[i];
//   drawStar(cx, cy, spikes, outerRadius, innerRadius, color);
// }
//
// // canvasBig.addEventListener('click', (e) => {
// //   if (event.region) {
// //     alert('You clicked ' + event.region);
// //   }
// // })
//
//
