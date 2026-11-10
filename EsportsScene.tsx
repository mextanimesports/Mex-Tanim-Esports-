import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface EsportsSceneProps {
  scrollProgress: number; // 0 to 1
  mousePos: { x: number; y: number }; // -1 to 1
}

export const EsportsScene: React.FC<EsportsSceneProps> = ({ scrollProgress, mousePos }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
    crystal: THREE.Mesh;
    innerRing: THREE.Mesh;
    outerRing: THREE.Mesh;
    bladesGroup: THREE.Group;
    particles: THREE.Points;
    pointLight: THREE.PointLight;
    frameId: number;
    clock: THREE.Clock;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as per skill
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch (e) {
        return false;
      }
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060608, 0.025);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x1a0505, 1.5);
    scene.add(ambientLight);

    // Main Crimson Key Light
    const keyLight = new THREE.DirectionalLight(0xd90000, 3.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // Metallic Silver Rim Light
    const rimLight = new THREE.DirectionalLight(0xc0c0c0, 2.0);
    rimLight.position.set(-5, -3, -3);
    scene.add(rimLight);

    // Core Point Light
    const pointLight = new THREE.PointLight(0xff2a35, 4.0, 15);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 4. Main 3D Esports Artifact Composite (3-12 parts)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Part A: Core Faceted Ruby Crystal
    const crystalGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xd90000,
      emissive: 0x5a0000,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.6,
      opacity: isSoftwareGl ? 0.8 : 1,
      transparent: true,
      reflectivity: 0.9
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    masterGroup.add(crystal);

    // Part B: Inner Orbital Chrome Ring
    const innerRingGeo = new THREE.TorusGeometry(1.4, 0.04, 16, 64);
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      metalness: 0.95,
      roughness: 0.15
    });
    const innerRing = new THREE.Mesh(innerRingGeo, chromeMat);
    masterGroup.add(innerRing);

    // Part C: Outer Segmented Crimson Ring
    const outerRingGeo = new THREE.TorusGeometry(2.1, 0.06, 16, 64);
    const crimsonMetalMat = new THREE.MeshStandardMaterial({
      color: 0x990000,
      emissive: 0x330000,
      metalness: 0.85,
      roughness: 0.25
    });
    const outerRing = new THREE.Mesh(outerRingGeo, crimsonMetalMat);
    masterGroup.add(outerRing);

    // Part D: 6 Curved Mechanical Esports Blades (Inspired by Mex Tanim crest)
    const bladesGroup = new THREE.Group();
    const bladeCount = 6;
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const bladeShape = new THREE.Shape();
      bladeShape.moveTo(0, 0);
      bladeShape.lineTo(0.2, 0.5);
      bladeShape.lineTo(0.08, 0.9);
      bladeShape.lineTo(-0.15, 0.4);
      bladeShape.closePath();

      const extrudeSettings = {
        depth: 0.06,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.02,
        bevelThickness: 0.02
      };

      const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
      const bladeMat = i % 2 === 0 ? crimsonMetalMat : chromeMat;
      const blade = new THREE.Mesh(bladeGeo, bladeMat);

      blade.position.x = Math.cos(angle) * 1.6;
      blade.position.y = Math.sin(angle) * 1.6;
      blade.rotation.z = angle + Math.PI / 4;
      bladesGroup.add(blade);
    }
    masterGroup.add(bladesGroup);

    // 5. 3D Particle Cloud
    const particleCount = isSoftwareGl ? 200 : 500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xd90000);
    const c2 = new THREE.Color(0xff4d4d);
    const c3 = new THREE.Color(0xc0c0c0);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 14;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const mixed = Math.random() < 0.6 ? (Math.random() < 0.5 ? c1 : c2) : c3;
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Animation Loop
    const clock = new THREE.Clock();
    let frameId = 0;

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Continuous ambient rotation
      crystal.rotation.x += delta * 0.4;
      crystal.rotation.y += delta * 0.6;

      innerRing.rotation.x += delta * 0.5;
      innerRing.rotation.y -= delta * 0.3;

      outerRing.rotation.y += delta * 0.25;
      outerRing.rotation.z += delta * 0.35;

      bladesGroup.rotation.z -= delta * 0.8;

      // Particle gentle drift
      particles.rotation.y = time * 0.05;
      particles.rotation.x = time * 0.03;

      // Pulse the core light
      pointLight.intensity = 3.5 + Math.sin(time * 3.5) * 1.5;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      group: masterGroup,
      crystal,
      innerRing,
      outerRing,
      bladesGroup,
      particles,
      pointLight,
      frameId,
      clock
    };

    // 7. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      innerRingGeo.dispose();
      outerRingGeo.dispose();
      chromeMat.dispose();
      crimsonMetalMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // Update scene based on scroll and mouse position
  useEffect(() => {
    if (!sceneRef.current) return;
    const { group, camera, pointLight } = sceneRef.current;

    // 1. Mouse Tilt (Subtle Parallax)
    const targetRotX = mousePos.y * 0.35;
    const targetRotY = mousePos.x * 0.45;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.08);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.08);

    // 2. Cinematic Scroll Transformations across Chapters
    // Normalized scrollProgress ranges from 0 to 1
    const p = Math.max(0, Math.min(1, scrollProgress));

    if (p < 0.2) {
      // Scene 1: Hero / Brand Intro — Centered, imposing
      const t = p / 0.2;
      group.position.x = THREE.MathUtils.lerp(0, 1.8, t);
      group.position.y = THREE.MathUtils.lerp(0, -0.2, t);
      group.scale.setScalar(THREE.MathUtils.lerp(1.2, 0.95, t));
      camera.position.z = THREE.MathUtils.lerp(7.5, 6.8, t);
    } else if (p < 0.4) {
      // Scene 2: Tournaments Showcase — Shifted right, blade tilt
      const t = (p - 0.2) / 0.2;
      group.position.x = THREE.MathUtils.lerp(1.8, -1.9, t);
      group.position.y = THREE.MathUtils.lerp(-0.2, 0.3, t);
      group.scale.setScalar(THREE.MathUtils.lerp(0.95, 1.1, t));
      camera.position.z = THREE.MathUtils.lerp(6.8, 6.2, t);
    } else if (p < 0.6) {
      // Scene 3: Ecosystem — Centered, constellation expansion
      const t = (p - 0.4) / 0.2;
      group.position.x = THREE.MathUtils.lerp(-1.9, 0, t);
      group.position.y = THREE.MathUtils.lerp(0.3, 0.5, t);
      group.scale.setScalar(THREE.MathUtils.lerp(1.1, 1.35, t));
      camera.position.z = THREE.MathUtils.lerp(6.2, 5.5, t);
    } else if (p < 0.8) {
      // Scene 4: Champions & Hall of Fame — Shifted left with trophy elevation
      const t = (p - 0.6) / 0.2;
      group.position.x = THREE.MathUtils.lerp(0, 1.6, t);
      group.position.y = THREE.MathUtils.lerp(0.5, -0.4, t);
      group.scale.setScalar(THREE.MathUtils.lerp(1.35, 1.05, t));
      camera.position.z = THREE.MathUtils.lerp(5.5, 6.5, t);
    } else {
      // Scene 5 & Final CTA: Massive scale centered climax
      const t = (p - 0.8) / 0.2;
      group.position.x = THREE.MathUtils.lerp(1.6, 0, t);
      group.position.y = THREE.MathUtils.lerp(-0.4, 0, t);
      group.scale.setScalar(THREE.MathUtils.lerp(1.05, 1.5, t));
      camera.position.z = THREE.MathUtils.lerp(6.5, 5.2, t);
    }
  }, [scrollProgress, mousePos]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
};
