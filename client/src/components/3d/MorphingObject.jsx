import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { servicesConfig } from '../../data/servicesConfig';
import { useStore } from '../../hooks/useStore';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const PARTICLE_COUNT = 2500;

export function MorphingObject() {
    const meshRef = useRef();
    const { activeServiceId } = useStore();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // 1. Initial Data for Particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            temp.push({
                position: new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8),
                velocity: new THREE.Vector3(0, 0, 0),
                target: new THREE.Vector3(0, 0, 0),
                speed: 0.015 + Math.random() * 0.04,
                friction: 0.94 + Math.random() * 0.04,
                randomOffset: Math.random() * Math.PI * 2
            });
        }
        return temp;
    }, []);

    // Helper to get service color
    const accentColor = useMemo(() => {
        if (!activeServiceId) return new THREE.Color(isDark ? '#222222' : '#1A1A1A'); // Much darker in light mode
        const service = servicesConfig.find(s => s.id === activeServiceId);
        return new THREE.Color(service?.color || (isDark ? '#333333' : '#1A1A1A'));
    }, [activeServiceId, isDark]);

    // Handle Mouse
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const dummy = new THREE.Object3D();
    const targetVec = new THREE.Vector3();

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        if (!meshRef.current) return;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = particles[i];

            // 2. Target Logic
            if (activeServiceId) {
                // RECRUITMENT MODE: Swarm follows the service text area
                const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
                // Add a spiral/dynamic radius
                const radius = 1.8 + Math.sin(t * 1.5 + i * 0.05) * 0.6;
                // Add some chaotic noise to the target positions
                const noiseX = Math.sin(t * 2 + i) * 0.2;
                const noiseY = Math.cos(t * 2 + i) * 0.2;

                targetVec.set(
                    2.8 + Math.cos(angle + t * 0.5) * radius + noiseX,
                    Math.sin(angle + t * 0.5) * radius * 0.5 + noiseY,
                    Math.sin(angle * 2 + t) * 1.2
                );
            } else {
                // FOLLOW MODE: Magnetized to the mouse
                targetVec.set(
                    mousePos.x * 4 + Math.sin(t + p.randomOffset) * 0.6,
                    mousePos.y * 3 + Math.cos(t + p.randomOffset) * 0.6,
                    Math.sin(t * 0.3 + p.randomOffset) * 2.5
                );
            }

            // 3. Physics Engine - INCREASE SPEED ON HOVER
            const currentSpeed = activeServiceId ? p.speed * 2.5 : p.speed;
            const currentFriction = activeServiceId ? 0.96 : p.friction;

            const dist = p.position.distanceTo(targetVec);
            const force = (targetVec.clone().sub(p.position)).normalize().multiplyScalar(currentSpeed * dist);

            p.velocity.add(force);
            p.velocity.multiplyScalar(currentFriction);
            p.position.add(p.velocity);

            // 4. Update the Mesh instance
            dummy.position.copy(p.position);
            dummy.rotation.set(t * 1.2 + p.randomOffset, t * 0.5, 0);

            // Interaction scale pop - BIGGER IN LIGHT MODE FOR VISIBILITY
            const baseScale = activeServiceId ? 0.04 : 0.02;
            const s = (isDark ? baseScale : baseScale * 1.2) + Math.sin(t * 5 + i) * 0.008;
            dummy.scale.set(s, s, s);

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;

        // 5. Update Color (Emissive) with Pulse
        const defaultColor = isDark ? new THREE.Color('#333333') : new THREE.Color('#0A0A0A'); // Near black for contrast
        const defaultEmissive = isDark ? new THREE.Color('#000000') : new THREE.Color('#000000'); // No glow for inactive in day mode

        // Dynamic Pulse
        const pulse = Math.sin(t * 3) * 0.5 + 0.5;
        const eIntensity = activeServiceId
            ? (isDark ? 80 + pulse * 40 : 20 + pulse * 10) // Lower intensity in Day mode to keep color solid
            : (isDark ? 5 : 0); // No emissive for inactive day particles

        meshRef.current.material.color = activeServiceId ? accentColor : defaultColor;
        meshRef.current.material.emissive = activeServiceId ? accentColor : defaultEmissive;
        meshRef.current.material.emissiveIntensity = eIntensity;

        // Dynamic material adjustments
        meshRef.current.material.metalness = isDark ? 1 : 0.4;
        meshRef.current.material.roughness = isDark ? 0 : 0.6;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial />
        </instancedMesh>
    );
}
