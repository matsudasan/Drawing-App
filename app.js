const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');
const width = canvas.width
const color = document.getElementById('color')
const lineWidth = document.getElementById('line-width')
const stalker = document.getElementById('stalker')
const save = document.getElementById('save')
const clear = document.getElementById('clear')
let mouse = {
    x: 0,
    y: 0
}

window.onresize = () => {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
    if (document.body.clientWidth < width) {
        canvas.width = document.querySelector('.draw').clientWidth
    } else {
        canvas.width = width
    }
    ctx.putImageData(data, 0, 0)
}
window.onload=()=>{
    if (document.body.clientWidth < width) {
        canvas.width = document.querySelector('.draw').clientWidth
    } else {
        canvas.width = width
    }
}
const MouseStalker = (e) => {
    stalker.style.display = "block"
    stalker.style.backgroundColor = color.value
    stalker.style.width = lineWidth.value + "px"
    stalker.style.height = lineWidth.value + "px"
    stalker.style.top = -lineWidth.value / 2 + "px"
    stalker.style.left = -lineWidth.value / 2 + "px"
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
}

const Paint = (e) => {
    mouse.x = e.offsetX
    mouse.y = e.offsetY
    ctx.lineTo(mouse.x, mouse.y)
    ctx.stroke()
}

const TouchMove = (e) => {
    e.preventDefault()
    mouse.x = e.touches[0].clientX - canvas.getBoundingClientRect().left
    mouse.y = e.touches[0].clientY - canvas.getBoundingClientRect().top
    ctx.lineTo(mouse.x, mouse.y)
    ctx.stroke()
}
canvas.onmouseleave = () => {
    stalker.style.display = "none"
    ctx.closePath()
    canvas.removeEventListener('mousemove', Paint)
    canvas.removeEventListener('touchmove', TouchMove)
}

canvas.onmousedown = (e) => {
    mouse.x = e.offsetX
    mouse.y = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = lineWidth.value
    ctx.lineCap = "round"
    ctx.strokeStyle = color.value
    ctx.lineTo(mouse.x, mouse.y)
    ctx.stroke()
    canvas.addEventListener('mousemove', Paint)
}

canvas.ontouchstart = (e) => {
    mouse.x = e.touches[0].clientX - canvas.getBoundingClientRect().left
    mouse.y = e.touches[0].clientY - canvas.getBoundingClientRect().top
    ctx.beginPath()
    ctx.lineWidth = lineWidth.value
    ctx.lineCap = "round"
    ctx.strokeStyle = color.value
    ctx.lineTo(mouse.x, mouse.y)
    ctx.stroke()
    canvas.addEventListener('touchmove', TouchMove)
}

canvas.onmouseup = () => {
    ctx.closePath()
    canvas.removeEventListener('mousemove', Paint)
    canvas.removeEventListener('touchmove', TouchMove)
}

canvas.addEventListener('mousemove', MouseStalker)

save.onclick = () => {
    const a = document.createElement('a')
    a.download = 'canvas.jpg'
    a.href = canvas.toDataURL()
    a.click()
}

clear.onclick = () => {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}