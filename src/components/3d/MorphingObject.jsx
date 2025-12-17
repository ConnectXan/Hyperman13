import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import { servicesConfig } from '../../data/servicesConfig';
import { useStore } from '../../hooks/useStore';
import * as THREE from 'three';

export function MorphingObject() {
    const mesh = useRef();
    const material = useRef();
    const { activeServiceId } = useStore();

    // Base color
    const defaultColor = new THREE.Color('#333333');

    // Memoize target colors map
    const colorMap = useMemo(() => {
        const map = { default: defaultColor };
        servicesConfig.forEach(service => {
            map[service.id] = new THREE.Color(service.color);
        });
        return map;
    }, []);

    useFrame((state, delta) => {
        if (!material.current) return;

        // Determine target color based on active service
        const targetColor = activeServiceId ? colorMap[activeServiceId] : colorMap.default;

        // Lerp color for smooth transition
        material.current.color.lerp(targetColor, delta * 2);

        // Distort animation
        // Increase distortion speed/amount when active
        const targetDistort = activeServiceId ? 0.6 : 0.3;
        const targetSpeed = activeServiceId ? 5 : 2;

        material.current.distort = THREE.MathUtils.lerp(material.current.distort, targetDistort, delta);
        material.current.speed = THREE.MathUtils.lerp(material.current.speed, targetSpeed, delta);
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={mesh} position={[0, 0, 0]} scale={1.5}>
                <icosahedronGeometry args={[1, 15]} /> {/* High detail for smooth distortion */}
                <MeshDistortMaterial
                    ref={material}
                    color="#333333"
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.5} // "Futuristic" metallic look
                />
            </mesh>
        </Float>
    );
}
