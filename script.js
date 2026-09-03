
// ============================================================
// HOGWARTS-STYLE CINEMATIC 3D GOTHIC GATE
// Three.js + WebGL
// ============================================================

import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import { OrbitControls } from
"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js";


// ============================================================
// SCENE
// ============================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020403);

scene.fog = new THREE.FogExp2(
    0x020504,
    0.035
);


// ============================================================
// CAMERA
// ============================================================

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);

camera.position.set(
    0,
    5,
    27
);


// ============================================================
// RENDERER
// ============================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.2;

document.body.appendChild(
    renderer.domElement
);


// ============================================================
// LIGHTING
// ============================================================

const ambientLight =
    new THREE.AmbientLight(
        0x06110b,
        0.8
    );

scene.add(ambientLight);


// Emerald atmosphere

const emeraldLight =
    new THREE.PointLight(
        0x00ff88,
        35,
        50
    );

emeraldLight.position.set(
    0,
    5,
    8
);

scene.add(emeraldLight);


// Moon light

const moonLight =
    new THREE.DirectionalLight(
        0x6688aa,
        2.5
    );

moonLight.position.set(
    -15,
    25,
    15
);

moonLight.castShadow = true;

scene.add(moonLight);


// Gate lights

const gateGlowLeft =
    new THREE.PointLight(
        0x00ff66,
        8,
        15
    );

gateGlowLeft.position.set(
    -7,
    5,
    5
);

scene.add(gateGlowLeft);


const gateGlowRight =
    new THREE.PointLight(
        0x00ff66,
        8,
        15
    );

gateGlowRight.position.set(
    7,
    5,
    5
);

scene.add(gateGlowRight);


// ============================================================
// GROUND
// ============================================================

const groundGeometry =
    new THREE.PlaneGeometry(
        200,
        200
    );

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x030605,
        roughness: 0.95,
        metalness: 0.2
    });

const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

ground.rotation.x =
    -Math.PI / 2;

ground.position.y = -2;

ground.receiveShadow = true;

scene.add(ground);


// ============================================================
// GOTHIC STONE MATERIAL
// ============================================================

const stoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x101714,
        roughness: 0.8,
        metalness: 0.25
    });

const darkStone =
    new THREE.MeshStandardMaterial({
        color: 0x070b09,
        roughness: 0.9,
        metalness: 0.15
    });


// ============================================================
// GATE STRUCTURE
// ============================================================

const gateGroup =
    new THREE.Group();

scene.add(gateGroup);


// Massive pillars

function createPillar(x) {

    const pillar =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                5,
                18,
                5
            ),
            stoneMaterial
        );

    pillar.position.set(
        x,
        7,
        0
    );

    pillar.castShadow = true;
    pillar.receiveShadow = true;

    gateGroup.add(pillar);


    // Pillar cap

    const cap =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                3.5,
                4,
                4
            ),
            darkStone
        );

    cap.position.set(
        x,
        18,
        0
    );

    cap.rotation.y =
        Math.PI / 4;

    cap.castShadow = true;

    gateGroup.add(cap);
}

createPillar(-8);
createPillar(8);


// ============================================================
// ARCH
// ============================================================

const archGeometry =
    new THREE.TorusGeometry(
        8,
        1.25,
        12,
        64,
        Math.PI
    );

const arch =
    new THREE.Mesh(
        archGeometry,
        stoneMaterial
    );

arch.rotation.z =
    Math.PI;

arch.position.set(
    0,
    15,
    0
);

arch.scale.y = 1.15;

arch.castShadow = true;

gateGroup.add(arch);


// ============================================================
// GATE DOORS
// ============================================================

const leftDoor =
    new THREE.Group();

const rightDoor =
    new THREE.Group();

gateGroup.add(leftDoor);
gateGroup.add(rightDoor);


// Door dimensions

const doorWidth = 7;
const doorHeight = 15;


// Metal material

const metalMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x101b17,
        metalness: 0.9,
        roughness: 0.3
    });


// Create individual bars

function createGateDoor(group, side) {

    // Main frame

    const frame =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                doorWidth,
                0.6,
                0.7
            ),
            metalMaterial
        );

    frame.position.y =
        doorHeight / 2;

    group.add(frame);


    // Vertical bars

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const bar =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.18,
                    0.18,
                    doorHeight,
                    12
                ),
                metalMaterial
            );

        bar.position.x =
            -doorWidth / 2 +
            0.7 +
            i * 1.05;

        bar.position.y =
            doorHeight / 2;

        bar.castShadow = true;

        group.add(bar);


        // Spike

        const spike =
            new THREE.Mesh(
                new THREE.ConeGeometry(
                    0.35,
                    1.3,
                    6
                ),
                metalMaterial
            );

        spike.position.x =
            bar.position.x;

        spike.position.y =
            doorHeight + 0.65;

        group.add(spike);
    }


    // Horizontal bars

    for (
        let y = 3;
        y < doorHeight;
        y += 3
    ) {

        const horizontal =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    doorWidth,
                    0.35,
                    0.7
                ),
                metalMaterial
            );

        horizontal.position.y = y;

        group.add(horizontal);
    }


    // Emerald runes

    const runeMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x00ff77
        });

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const rune =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.12,
                    2,
                    0.08
                ),
                runeMaterial
            );

        rune.position.x =
            -2 + i;

        rune.position.y =
            5 + Math.sin(i) * 2;

        group.add(rune);
    }
}


// Create doors

createGateDoor(
    leftDoor,
    -1
);

createGateDoor(
    rightDoor,
    1
);


// Door pivots

leftDoor.position.x = -7;

rightDoor.position.x = 7;


// ============================================================
// LOCKS
// ============================================================

const locks = [];

function createLock(
    x,
    y,
    scale = 1
) {

    const lock =
        new THREE.Group();

    lock.position.set(
        x,
        y,
        -0.8
    );

    lock.scale.setScalar(scale);

    gateGroup.add(lock);


    // Lock body

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.6,
                2,
                0.8
            ),
            metalMaterial
        );

    body.castShadow = true;

    lock.add(body);


    // Lock ring

    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.65,
                0.18,
                10,
                32
            ),
            metalMaterial
        );

    ring.position.y =
        1.2;

    lock.add(ring);


    // Emerald center

    const core =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.22,
                16,
                16
            ),
            new THREE.MeshBasicMaterial({
                color: 0x00ff77
            })
        );

    core.position.z =
        -0.45;

    lock.add(core);


    // Lock mechanism

    const mechanism =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.18,
                0.18,
                1.2,
                12
            ),
            metalMaterial
        );

    mechanism.rotation.z =
        Math.PI / 2;

    lock.add(mechanism);


    locks.push({
        group: lock,
        mechanism,
        core,
        unlocked: false
    });
}


createLock(
    0,
    4.5,
    1.1
);

createLock(
    -3.5,
    9,
    0.8
);

createLock(
    3.5,
    9,
    0.8
);


// ============================================================
// CASTLE
// ============================================================

const castle =
    new THREE.Group();

castle.position.set(
    0,
    -2,
    -25
);

castle.scale.setScalar(0.01);

scene.add(castle);


// Castle material

const castleMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x111816,
        roughness: 0.75,
        metalness: 0.1
    });


// Main castle body

const castleBody =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            25,
            14,
            10
        ),
        castleMaterial
    );

castleBody.position.y =
    7;

castle.add(castleBody);


// Towers

function createTower(x, height) {

    const tower =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                3,
                3.5,
                height,
                8
            ),
            castleMaterial
        );

    tower.position.set(
        x,
        height / 2,
        0
    );

    tower.castShadow = true;

    castle.add(tower);


    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                4,
                6,
                8
            ),
            darkStone
        );

    roof.position.set(
        x,
        height + 3,
        0
    );

    castle.add(roof);
}


createTower(-10, 25);
createTower(10, 22);
createTower(-4, 18);
createTower(4, 20);


// ============================================================
// CASTLE WINDOWS
// ============================================================

const windowMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x00ff88
    });

for (
    let i = 0;
    i < 20;
    i++
) {

    const window =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                0.5,
                1.2
            ),
            windowMaterial
        );

    window.position.set(
        (Math.random() - 0.5) * 18,
        4 + Math.random() * 10,
        -5.1
    );

    castle.add(window);
}


// ============================================================
// SNAKE
// ============================================================

const snake =
    new THREE.Group();

scene.add(snake);

snake.position.set(
    0,
    3,
    4
);


// Snake body

const snakeMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x003b20,
        roughness: 0.35,
        metalness: 0.55,
        emissive: 0x002d18
    });


const snakeSegments = [];

for (
    let i = 0;
    i < 18;
    i++
) {

    const segment =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.38 -
                i * 0.012,
                12,
                12
            ),
            snakeMaterial
        );

    segment.position.x =
        -i * 0.4;

    segment.position.y =
        Math.sin(i * 0.7) *
        0.2;

    snake.add(segment);

    snakeSegments.push(segment);
}


// Snake head

const snakeHead =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.55,
            16,
            16
        ),
        snakeMaterial
    );

snake.add(snakeHead);

snakeHead.position.x =
    0.3;


// Snake eyes

const eyeMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x66ff00
    });


for (
    const side of [-1, 1]
) {

    const eye =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.07,
                8,
                8
            ),
            eyeMaterial
        );

    eye.position.set(
        0.65,
        0.2,
        side * 0.25
    );

    snake.add(eye);
}


// ============================================================
// MAGIC PARTICLES
// ============================================================

const particleCount = 1200;

const particleGeometry =
    new THREE.BufferGeometry();

const positions =
    new Float32Array(
        particleCount * 3
    );

for (
    let i = 0;
    i < particleCount;
    i++
) {

    positions[i * 3] =
        (Math.random() - 0.5) * 45;

    positions[i * 3 + 1] =
        Math.random() * 25;

    positions[i * 3 + 2] =
        Math.random() * 30 - 20;
}

particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        positions,
        3
    )
);


const particleMaterial =
    new THREE.PointsMaterial({
        color: 0x00ff88,
        size: 0.06,
        transparent: true,
        opacity: 0.7,
        blending:
            THREE.AdditiveBlending
    });


const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );

scene.add(particles);


// ============================================================
// MAGIC ENERGY RING
// ============================================================

const magicRing =
    new THREE.Mesh(
        new THREE.TorusGeometry(
            5,
            0.08,
            16,
            100
        ),
        new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.7
        })
    );

magicRing.position.set(
    0,
    7,
    2
);

magicRing.rotation.x =
    Math.PI / 2;

scene.add(magicRing);


// ============================================================
// LIGHTNING
// ============================================================

let lightningTimer = 0;

function createLightning() {

    const points = [];

    let x = 0;

    let y = 20;

    let z = -5;

    for (
        let i = 0;
        i < 10;
        i++
    ) {

        points.push(
            new THREE.Vector3(
                x,
                y,
                z
            )
        );

        x +=
            (Math.random() - 0.5) * 2;

        y -= 2;

        z +=
            (Math.random() - 0.5);
    }


    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);


    const material =
        new THREE.LineBasicMaterial({
            color: 0x99ffcc
        });


    const bolt =
        new THREE.Line(
            geometry,
            material
        );

    bolt.position.x =
        (Math.random() - 0.5) * 25;

    scene.add(bolt);


    lightningFlash();


    setTimeout(() => {

        scene.remove(bolt);

    }, 100);
}


function lightningFlash() {

    moonLight.intensity = 15;

    setTimeout(() => {

        moonLight.intensity = 2.5;

    }, 80);
}


// ============================================================
// AUDIO ENGINE
// ============================================================

let audioContext = null;


function startAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();
    }
}


// Mechanical click

function mechanicalClick(
    frequency = 120
) {

    if (!audioContext)
        return;

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type = "square";

    oscillator.frequency.value =
        frequency;

    gain.gain.setValueAtTime(
        0.12,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.15
    );

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.15
    );
}


// Deep gate sound

function gateSound() {

    if (!audioContext)
        return;

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type = "sawtooth";

    oscillator.frequency.setValueAtTime(
        45,
        audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        18,
        audioContext.currentTime + 2
    );

    gain.gain.setValueAtTime(
        0.25,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 3
    );

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 3
    );
}


// ============================================================
// CINEMATIC SEQUENCE
// ============================================================

let sequenceStarted = false;

let sequenceTime = 0;

let gateOpening = false;

let castleRevealed = false;


function startSequence() {

    if (sequenceStarted)
        return;

    sequenceStarted = true;

    startAudio();

    sequenceTime = 0;

    // Start cinematic animation
    cinematicSequence();
}


// ============================================================
// LOCK ANIMATION
// ============================================================

function unlockLock(index) {

    const lock =
        locks[index];

    if (!lock ||
        lock.unlocked)
        return;


    lock.unlocked = true;


    // Mechanical rotation

    lock.mechanism.rotation.y =
        Math.PI / 2;


    // Glow

    lock.core.material.color
        .setHex(0x99ffcc);


    // Sound

    mechanicalClick(
        100 + index * 80
    );


    // Magic pulse

    emeraldLight.intensity = 60;

    setTimeout(() => {

        emeraldLight.intensity = 35;

    }, 200);
}


// ============================================================
// GATE OPEN
// ============================================================

function openGate() {

    if (gateOpening)
        return;

    gateOpening = true;

    gateSound();


    const duration = 4000;

    const start =
        performance.now();


    function animateGate(
        now
    ) {

        const progress =
            Math.min(
                (now - start) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        leftDoor.rotation.y =
            -eased * Math.PI * 0.55;

        rightDoor.rotation.y =
            eased * Math.PI * 0.55;


        if (progress < 1) {

            requestAnimationFrame(
                animateGate
            );

        } else {

            revealCastle();
        }
    }


    requestAnimationFrame(
        animateGate
    );
}


// ============================================================
// CASTLE REVEAL
// ============================================================

function revealCastle() {

    if (castleRevealed)
        return;

    castleRevealed = true;


    const start =
        performance.now();


    function reveal(now) {

        const progress =
            Math.min(
                (now - start) /
                3500,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                4
            );


        castle.scale.setScalar(
            0.01 +
            eased * 1.0
        );


        camera.position.z =
            27 -
            eased * 9;


        camera.position.y =
            5 +
            eased * 2;


        camera.lookAt(
            0,
            7,
            -18
        );


        if (progress < 1) {

            requestAnimationFrame(
                reveal
            );

        }
    }


    requestAnimationFrame(
        reveal
    );
}


// ============================================================
// CINEMATIC TIMELINE
// ============================================================

function cinematicSequence() {

    const start =
        performance.now();


    function timeline(now) {

        sequenceTime =
            now - start;


        // --------------------------------
        // PHASE 1
        // Camera approaches
        // --------------------------------

        if (
            sequenceTime < 3000
        ) {

            const p =
                sequenceTime / 3000;


            camera.position.z =
                27 -
                p * 4;

            camera.position.y =
                5 +
                Math.sin(p * Math.PI) *
                0.5;


            camera.lookAt(
                0,
                7,
                0
            );
        }


        // --------------------------------
        // PHASE 2
        // First lock
        // --------------------------------

        if (
            sequenceTime > 3200 &&
            sequenceTime < 3300
        ) {

            unlockLock(0);
        }


        // --------------------------------
        // PHASE 3
        // Second lock
        // --------------------------------

        if (
            sequenceTime > 4500 &&
            sequenceTime < 4600
        ) {

            unlockLock(1);
        }


        // --------------------------------
        // PHASE 4
        // Third lock
        // --------------------------------

        if (
            sequenceTime > 5800 &&
            sequenceTime < 5900
        ) {

            unlockLock(2);
        }


        // --------------------------------
        // PHASE 5
        // Magic surge
        // --------------------------------

        if (
            sequenceTime > 7000 &&
            sequenceTime < 7100
        ) {

            magicRing.scale.setScalar(
                1.5
            );

            emeraldLight.intensity =
                100;

            mechanicalClick(250);
        }


        // --------------------------------
        // PHASE 6
        // Gate opens
        // --------------------------------

        if (
            sequenceTime > 7600 &&
            !gateOpening
        ) {

            openGate();
        }


        // --------------------------------
        // Lightning
        // --------------------------------

        if (
            Math.random() < 0.002
        ) {

            createLightning();
        }


        if (
            sequenceTime < 13000
        ) {

            requestAnimationFrame(
                timeline
            );
        }
    }


    requestAnimationFrame(
        timeline
    );
}


// ============================================================
// MOUSE MOVEMENT
// ============================================================

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;


window.addEventListener(
    "mousemove",
    event => {

        mouseX =
            (event.clientX /
                window.innerWidth -
                0.5);

        mouseY =
            (event.clientY /
                window.innerHeight -
                0.5);
    }
);


// ============================================================
// START SCREEN
// ============================================================

const startOverlay =
    document.createElement(
        "div"
    );

startOverlay.innerHTML = `
    <div style="
        position:fixed;
        inset:0;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        background:
        radial-gradient(
            circle,
            rgba(0,80,40,.25),
            #010302 70%
        );
        z-index:9999;
        cursor:pointer;
        color:#d9ffe9;
        font-family:Georgia,serif;
        text-align:center;
    ">

        <div style="
            font-size:14px;
            letter-spacing:7px;
            opacity:.7;
            margin-bottom:25px;
        ">
            THE FORBIDDEN GATES
        </div>

        <div style="
            font-size:48px;
            letter-spacing:10px;
            text-shadow:
            0 0 20px #00ff88;
        ">
            ENTER
        </div>

        <div style="
            margin-top:20px;
            font-size:12px;
            letter-spacing:4px;
            opacity:.5;
        ">
            CLICK TO AWAKEN THE MAGIC
        </div>

    </div>
`;

document.body.appendChild(
    startOverlay
);


startOverlay.addEventListener(
    "click",
    () => {

        startOverlay.remove();

        startSequence();

    }
);


// ============================================================
// ANIMATION LOOP
// ============================================================

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const elapsed =
        clock.getElapsedTime();


    // --------------------------------
    // Emerald pulse
    // --------------------------------

    emeraldLight.intensity =
        30 +
        Math.sin(
            elapsed * 2
        ) * 10;


    // --------------------------------
    // Magic ring
    // --------------------------------

    magicRing.rotation.z =
        elapsed * 0.3;

    magicRing.rotation.y =
        elapsed * 0.2;


    magicRing.scale.setScalar(
        1 +
        Math.sin(
            elapsed * 3
        ) * 0.08
    );


    // --------------------------------
    // Particles
    // --------------------------------

    particles.rotation.y =
        elapsed * 0.015;


    particles.position.y =
        Math.sin(
            elapsed * 0.2
        ) * 0.5;


    // --------------------------------
    // Snake slithering
    // --------------------------------

    snake.position.y =
        3 +
        Math.sin(
            elapsed * 3
        ) * 0.25;


    snake.rotation.z =
        Math.sin(
            elapsed * 2
        ) * 0.12;


    snakeSegments.forEach(
        (segment, i) => {

            segment.position.y =
                Math.sin(
                    elapsed * 4 -
                    i * 0.5
                ) * 0.3;
        }
    );


    // --------------------------------
    // Mouse camera parallax
    // --------------------------------

    targetX =
        mouseX * 2.5;

    targetY =
        mouseY * 1.5;


    if (!sequenceStarted ||
        !castleRevealed) {

        camera.position.x +=
            (
                targetX -
                camera.position.x
            ) * 0.025;

        camera.position.y +=
            (
                5 -
                targetY -
                camera.position.y
            ) * 0.025;
    }


    // --------------------------------
    // Lightning
    // --------------------------------

    lightningTimer +=
        clock.getDelta();


    renderer.render(
        scene,
        camera
    );
}


// ============================================================
// RESIZE
// ============================================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);


// ============================================================
// START
// ============================================================

animate();
