import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl'),
      scene = new THREE.Scene(),
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
      )

scene.add(mesh)

const sizes = { width: window.innerWidth, height: window.innerHeight },
      camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100),
      renderer = new THREE.WebGLRenderer({ canvas })

camera.position.z = 3
scene.add(camera)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Resize handling to keep canvas responsive
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Double click to toggle fullscreen
window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) canvas.requestFullscreen()
    else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen()
  } else {
    if (document.exitFullscreen) document.exitFullscreen()
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
  }
})

const clock = new THREE.Clock()
function tick() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()
