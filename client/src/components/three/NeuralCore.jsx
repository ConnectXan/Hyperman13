import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../hooks/useStore';
import { servicesConfig } from '../../data/servicesConfig';
import { useTheme } from '../../context/ThemeContext';

const COUNT = 2500;
const RADIUS = 2.8;

const ANIMATION_SPEED = 0.05;

// Helper to generate shapes
const getSpherePositions = (count) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;

        positions[i * 3] = RADIUS * Math.cos(theta) * Math.sin(phi);
        positions[i * 3 + 1] = RADIUS * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = RADIUS * Math.cos(phi);
    }
    return positions;
};

const getCubePositions = (count) => {
    const positions = new Float32Array(count * 3);
    const side = 4.5;
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * side;
        positions[i * 3 + 1] = (Math.random() - 0.5) * side;
        positions[i * 3 + 2] = (Math.random() - 0.5) * side;
    }
    return positions;
};

const getStreamPositions = (count) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // A long cylinder/tunnel along X axis
        positions[i * 3] = (Math.random() - 0.5) * 15; // Length
        const r = 2 + Math.random() * 2; // Radius variation
        const theta = Math.random() * Math.PI * 2;
        positions[i * 3 + 1] = r * Math.cos(theta);
        positions[i * 3 + 2] = r * Math.sin(theta);
    }
    return positions;
};

const getFluidPositions = (count) => {
    // Start with sphere, but we'll add noise in useFrame
    return getSpherePositions(count);
};

function Particles() {
    const { activeServiceId } = useStore();
    const { theme } = useTheme(); // Get current theme
    const meshRef = useRef();
    const materialRef = useRef();

    // Memoize target positions for different states
    const shapes = useMemo(() => ({
        sphere: getSpherePositions(COUNT),
        cube: getCubePositions(COUNT),
        stream: getStreamPositions(COUNT),
        fluid: getFluidPositions(COUNT),
    }), []);

    // Current positions buffer
    const positions = useMemo(() => new Float32Array(shapes.sphere), [shapes]);

    // Animation state
    const currentShape = useRef('sphere');
    const targetColor = useRef(new THREE.Color('#ffffff'));

    // Determine target state based on activeServiceId and Theme
    useEffect(() => {
        if (!activeServiceId) {
            currentShape.current = 'sphere';
            // Idle Colors: Gold for Dark, Black for Light
            if (theme === 'dark') {
                targetColor.current.set('#E6C795');
            } else {
                targetColor.current.set('#050505');
            }
            return;
        }

        const service = servicesConfig.find(s => s.id === activeServiceId);
        if (service) {
            // Set Color
            targetColor.current.set(service.activeColor || service.color);

            // Set Shape Mode
            const id = service.id;
            if (['meta-ads', 'google-ads'].includes(id)) {
                currentShape.current = 'stream';
            } else if (['shopify-dev', 'web-dev'].includes(id)) {
                currentShape.current = 'cube';
            } else {
                // social-mgmt, ai-animation
                currentShape.current = 'fluid';
            }
        }
    }, [activeServiceId, theme]);

    useFrame((state) => {
        if (!meshRef.current) return;

        // 1. Color Interpolation
        if (materialRef.current) {
            materialRef.current.color.lerp(targetColor.current, 0.05);
        }

        // 2. Rotation Logic (Cursor Follow)
        // Smoothly look at cursor
        const { x, y } = state.pointer;
        // Target rotation based on mouse position (clamped for subtle effect)
        const targetRotX = -y * 0.5; // Look up/down
        const targetRotY = x * 0.5;  // Look left/right

        // Smoothly interpolate rotation
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05);

        // Add subtle constant idle rotation on top
        meshRef.current.rotation.y += 0.001;

        // 3. Position Morphing & "Magnetic Field"
        const targetPositions = shapes[currentShape.current];
        const currentPositions = meshRef.current.geometry.attributes.position.array;

        // Morph logic
        const time = state.clock.getElapsedTime();

        // Cursor position in 3D space (approximate projection for interaction)
        const cursorX = x * 10;
        const cursorY = y * 10;

        for (let i = 0; i < COUNT; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            let tx = targetPositions[ix];
            let ty = targetPositions[iy];
            let tz = targetPositions[iz];

            // Add dynamic movement based on mode
            if (currentShape.current === 'fluid') {
                // Organic Turbulence: Multiple sine waves for liquid feel
                tx += Math.sin(time * 2 + iy) * 0.5;
                ty += Math.cos(time * 1.5 + ix) * 0.5;
                tz += Math.sin(time * 1 + iz) * 0.2;
            } else if (currentShape.current === 'stream') {
                // High-Speed Data Flow: Moving along X axis
                // We add 'time' to the X position to make it flow
                // Use modulo to wrap around to keep it appearing continuous
                // Initial static stream pos is random cylinder.
                // We want particles to travel fast.
                const flowSpeed = 2.0;
                const trackLength = 15; // From getStreamPositions

                // Create a flow offset based on time + individual particle offset
                let flowX = (tx + time * flowSpeed) % trackLength;
                // Center the flow window
                tx = flowX - (trackLength / 2);

                // Add slight wobble
                ty += Math.sin(time * 10 + ix) * 0.05;
                tz += Math.cos(time * 10 + ix) * 0.05;

            } else if (currentShape.current === 'cube') {
                // Digital Structure: Subtle "Glitch" or "Breathing" snap
                // Particles stay mostly rigid, but occasionally twitch
                const twitch = Math.sin(time * 20 + ix) > 0.98 ? 0.2 : 0;
                tx += twitch;
            } else if (currentShape.current === 'sphere') {
                // Breathing/Pulse effect
                const pulse = Math.sin(time * 2 + ty * 0.5) * 0.2;
                tx += tx * pulse * 0.1;
                ty += ty * pulse * 0.1;
                tz += tz * pulse * 0.1;
            }

            // Magnetic/Turbulence Effect (Cursor Interaction)
            const dx = tx - cursorX;
            const dy = ty - cursorY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Influence radius
            if (dist < 4) {
                const force = (4 - dist) * 0.5; // Stronger
                // Push/Pull
                tx += (Math.random() - 0.5) * force * 0.3;
                ty += (Math.random() - 0.5) * force * 0.3;
                tz += (Math.random() - 0.5) * force * 0.3;
            }

            // Lerp towards target
            // Use different speeds for different modes if desired
            const lerpSpeed = currentShape.current === 'stream' ? 0.1 : ANIMATION_SPEED;

            currentPositions[ix] += (tx - currentPositions[ix]) * lerpSpeed;
            currentPositions[iy] += (ty - currentPositions[iy]) * lerpSpeed;
            currentPositions[iz] += (tz - currentPositions[iz]) * lerpSpeed;
        }

        meshRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={COUNT}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                ref={materialRef}
                size={0.06}
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

export default function NeuralCore() {
    // Basic mobile detection
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mobile: Shift object to the right (X axis positive)
    // Desktop: Center (X = 0)
    const position = isMobile ? [2.5, 0, 0] : [0, 0, 0];

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <group position={position}>
                    <Particles />
                </group>
            </Canvas>
        </div>
    );
}
