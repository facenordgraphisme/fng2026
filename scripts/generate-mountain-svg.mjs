// Génère le fond statique de la page d'accueil à partir de la même formule que HeroScene.
// Usage : node scripts/generate-mountain-svg.mjs
import * as THREE from 'three'
import { writeFileSync } from 'node:fs'

const W = 1600
const H = 1000
const SEGMENTS = 30

const geo = new THREE.PlaneGeometry(16, 16, SEGMENTS, SEGMENTS)
geo.rotateX(-Math.PI / 2)
const pos = geo.attributes.position
for (let i = 0; i < pos.count; i++) {
  const x = pos.getX(i)
  const z = pos.getZ(i)
  let height = Math.max(0, 4.5 - Math.sqrt(x * x + z * z) * 0.7)
  if (height > 0) {
    height += Math.sin(x * 3) * Math.cos(z * 3) * 0.4
    height += Math.sin(x * 6) * Math.cos(z * 6) * 0.15
  }
  height += Math.sin(x * 1.5) * Math.cos(z * 1.5) * 0.2
  pos.setY(i, height - 1.5)
}

const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000)
camera.position.set(0, 2, 10)
camera.lookAt(0, 0, 0)
camera.updateMatrixWorld()
camera.updateProjectionMatrix()

const mesh = new THREE.Matrix4().makeRotationY(0.35).setPosition(0, -1, 0)
const points = []
for (let i = 0; i < pos.count; i++) {
  const v = new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(mesh).project(camera)
  points.push([Math.round((v.x * 0.5 + 0.5) * W), Math.round((-v.y * 0.5 + 0.5) * H), v.z])
}

const visible = ([x, y, z]) => z < 1 && x > -200 && x < W + 200 && y > -200 && y < H + 200
const index = geo.index.array
const seen = new Set()
let d = ''
for (let i = 0; i < index.length; i += 3) {
  for (const [a, b] of [[index[i], index[i + 1]], [index[i + 1], index[i + 2]], [index[i + 2], index[i]]]) {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`
    if (seen.has(key)) continue
    seen.add(key)
    if (visible(points[a]) && visible(points[b])) d += `M${points[a][0]} ${points[a][1]}L${points[b][0]} ${points[b][1]}`
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><path d="${d}" fill="none" stroke="#7cc4c5" stroke-width="1" stroke-opacity=".55"/></svg>\n`
writeFileSync('public/assets/mountain-wireframe.svg', svg)
console.log('public/assets/mountain-wireframe.svg', svg.length, 'octets,', seen.size, 'arêtes')
