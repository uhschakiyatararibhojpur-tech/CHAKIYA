
import * as THREE from
'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const container = document.getElementById('earth-background');

if (!container) {
    console.error('Earth background container not found');
} else {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );

    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 1.75)
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // Earth group
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const loader = new THREE.TextureLoader();

    // Earth surface
    const earthGeometry = new THREE.SphereGeometry(
        1.45, 96, 96
    );

    const earthTexture = loader.load(
        'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
    );

    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        shininess: 12
    });

    const earth = new THREE.Mesh(
        earthGeometry,
        earthMaterial
    );

    earthGroup.add(earth);

    // Cloud layer
    const cloudTexture = loader.load(
        'https://threejs.org/examples/textures/planets/earth_clouds_1024.png'
    );

    const cloudGeometry = new THREE.SphereGeometry(
        1.465, 96, 96
    );

    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.23,
        depthWrite: false
    });

    const clouds = new THREE.Mesh(
        cloudGeometry,
        cloudMaterial
    );

    earthGroup.add(clouds);

    // Blue atmosphere
    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.53, 96, 96),
        new THREE.MeshBasicMaterial({
            color: 0x168cff,
            transparent: true,
            opacity: 0.17,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        })
    );

    earthGroup.add(atmosphere);

    // Lighting
    const sunlight = new THREE.DirectionalLight(
        0xffffff, 2.5
    );

    sunlight.position.set(-3, 2, 5);
    scene.add(sunlight);

    scene.add(
        new THREE.AmbientLight(0x526d99, 1)
    );

    // Position globe on right
    function positionEarth() {

        if (window.innerWidth < 768) {

            earthGroup.position.set(0.75, -0.1, 0);
            earthGroup.scale.setScalar(0.85);

        } else {

            earthGroup.position.set(1.75, 0, 0);
            earthGroup.scale.setScalar(1.05);

        }
    }

    positionEarth();

    // Animation
    const clock = new THREE.Clock();

    function animate() {

        requestAnimationFrame(animate);

        const delta = Math.min(clock.getDelta(), 0.05);

        earth.rotation.y += delta * 0.10;
        clouds.rotation.y += delta * 0.115;
        atmosphere.rotation.y += delta * 0.02;

        renderer.render(scene, camera);
    }

    animate();

    // Responsive screen
    window.addEventListener('resize', () => {

        camera.aspect =
            window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        positionEarth();
    });
}
