import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const gltfLoader = new GLTFLoader();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Set the background image
const textureLoader = new THREE.TextureLoader();
const backgroundImage = textureLoader.load('/img/background.jpg');
scene.background = backgroundImage;
scene.backgroundIntensity = 0.2;

const groundGeometry = new THREE.PlaneGeometry(5, 4);
groundGeometry.rotateX(-1.57079633); // 90deg
const backgroundMaterial = new THREE.MeshStandardMaterial({
    // map: backgroundImage,
    color: 0xFFFFFF,
    roughness: 0.8,
    metalness: 0.2,
});
const groundMesh = new THREE.Mesh(groundGeometry, backgroundMaterial);
groundMesh.position.y = -5;
scene.add(groundMesh);

var leftWing = null, rightwing = null, targetWingRotation = 0;

// Add mouse controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableRotate = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

function loadGLTF(file, inverted) {
    gltfLoader.load(
        file,
        function (gltf) {
            gltf.scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    const material = new THREE.MeshStandardMaterial({
                        color: 0xfc3fcc,
                        roughness: 0.8,  // Adjust this value to control shininess (higher values for less shine)
                        metalness: 0.2,  // Adjust this value to control metalness (lower values for less metal-like)
                    });
                    child.material = material;
                }
            });
            gltf.scene.scale.set(inverted ? -5 : 5, 5, 5);
            scene.add(gltf.scene);
            if (file == '/neondra-wing.gltf') {
                if (!inverted) {
                    leftWing = gltf.scene;
                    leftWing.position.z = -2;
                    leftWing.rotation.z = -(targetWingRotation / 78) + 45.1;
                } else {
                    rightwing = gltf.scene;
                    rightwing.position.z = -2;
                    rightwing.rotation.z = -(targetWingRotation / 78) - 45.1;
                }
            }
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened', error);
        }
    );
}
loadGLTF('/neondra1.gltf', false);
loadGLTF('/neondra-wing.gltf', false);
loadGLTF('/neondra-wing.gltf', true);

camera.position.z = 8;
camera.position.y = 2;

window.addEventListener('resize', handleResize);
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
handleResize();
        
document.getElementById('set-wings').addEventListener('change', function (e) {
    targetWingRotation = document.getElementById('set-wings').value;
});

function animate() {
    requestAnimationFrame(animate);
    if (leftWing) {
        leftWing.rotation.z = THREE.MathUtils.lerp(leftWing.rotation.z, -(targetWingRotation / 78) + 45.1, 0.006);
    }
    if (rightwing) {
        rightwing.rotation.z = THREE.MathUtils.lerp(rightwing.rotation.z, -(targetWingRotation / -78) - 45.1, 0.006);
    }
    controls.update();
    renderer.render(scene, camera);
}
animate();