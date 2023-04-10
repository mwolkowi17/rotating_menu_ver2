import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { moonMassDiv,  moonMassDiv4,  moonMassDiv6, moonMassDiv7 } from './divs';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)



const geometry = new THREE.TetrahedronGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const tetra = new THREE.Mesh(geometry, material)
scene.add(tetra)



const moonMassLabel = new CSS2DObject( moonMassDiv );
moonMassLabel.position.set( 0.6, 0.6, 0.6 );

const moonMassLabel4 = new CSS2DObject(moonMassDiv4);
moonMassLabel4.position.set( -0.6, -0.6, 0.6 );

const moonMassLabel6 = new CSS2DObject(moonMassDiv6);
moonMassLabel6.position.set( -0.6, 0.6, -0.6 );

const moonMassLabel7 = new CSS2DObject(moonMassDiv7);
moonMassLabel7.position.set( 0.6, -0.6, -0.6 );

tetra.add(moonMassLabel);

tetra.add(moonMassLabel4);

tetra.add(moonMassLabel6);

tetra.add(moonMassLabel7);


const labelRenderer = new CSS2DRenderer();
				labelRenderer.setSize( window.innerWidth, window.innerHeight );
				labelRenderer.domElement.style.position = 'absolute';
				labelRenderer.domElement.style.top = '0px';
				document.body.appendChild( labelRenderer.domElement );
                
const controls = new OrbitControls(camera, labelRenderer.domElement)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    labelRenderer.setSize( window.innerWidth, window.innerHeight );
    render()
    
}

function animate() {
    requestAnimationFrame(animate)

    tetra.rotation.x += 0.001
    tetra.rotation.y += 0.001

    controls.update()

    render()
    
}

function render() {
    renderer.render(scene, camera)
    labelRenderer.render( scene, camera );
}

animate()