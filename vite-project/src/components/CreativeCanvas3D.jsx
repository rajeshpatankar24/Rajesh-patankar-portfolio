import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export default function CreativeCanvas3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  
  // Track WebGL compatibility fallback
  const [hasWebGL, setHasWebGL] = useState(true);

  // Mouse coordinates (normalized -1 to 1)
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Theme synchronization refs
  const themeRef = useRef(theme);
  const lastTheme = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    // Detect WebGL
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    if (!containerRef.current || !canvasRef.current) return;

    // --- Three.js Setup ---
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    if (width === 0 || height === 0) {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Warm copper-orange and neon cyan/blue lighting to match screenshot
    const pointLightA = new THREE.PointLight(0xd97706, 12, 40); // Copper Orange
    pointLightA.position.set(3, 3, 3);
    scene.add(pointLightA);

    const pointLightB = new THREE.PointLight(0x3b82f6, 12, 40); // Royal Blue
    pointLightB.position.set(-3, -3, 3);
    scene.add(pointLightB);

    // Strong upward spot light from pedestal
    const upwardLight = new THREE.SpotLight(0xffffff, 15, 8, Math.PI / 4, 0.5, 1);
    upwardLight.position.set(0, -1.4, 0);
    scene.add(upwardLight);

    // --- Procedural 3D Technical Sphere Globe Group ---
    const displayGroup = new THREE.Group();
    scene.add(displayGroup);

    // Set initial suspended vertical offset
    displayGroup.position.set(0, 0.1, 0);

    // 1. Core Matte White Polymer Sphere (The main globe)
    const globeGeometry = new THREE.SphereGeometry(1.05, 64, 64);
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // Pure matte white polymer
      roughness: 0.55,
      metalness: 0.05
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    displayGroup.add(globeMesh);

    // 2. Intricate Wireframe Technical Shell (Geometric circuit detailing)
    const shellGeometry = new THREE.IcosahedronGeometry(1.062, 3); // 3-level density creates gorgeous circuit nodes
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: 0xd97706, // Glowing copper-orange by default
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const shellMesh = new THREE.Mesh(shellGeometry, shellMaterial);
    displayGroup.add(shellMesh);

    // 3. Suspended Pedestal Base (Disc)
    const pedestalGeometry = new THREE.CylinderGeometry(0.68, 0.74, 0.08, 32);
    const pedestalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.2
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
    pedestalMesh.position.y = -1.35;
    displayGroup.add(pedestalMesh);

    // Glowing ring outline on top of the pedestal base disc
    const ringGeometry = new THREE.RingGeometry(0.52, 0.58, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -1.306;
    displayGroup.add(ringMesh);

    // 4. Thin Orbital Tori (Rotating Rings)
    const orbitalGroup = new THREE.Group();
    displayGroup.add(orbitalGroup);

    const ring1Geometry = new THREE.TorusGeometry(1.26, 0.012, 8, 64);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x94a3b8, // Light slate
      transparent: true,
      opacity: 0.4
    });
    
    const ring1Mesh = new THREE.Mesh(ring1Geometry, torusMaterial);
    ring1Mesh.rotation.x = Math.PI / 2.6;
    orbitalGroup.add(ring1Mesh);

    const ring2Geometry = new THREE.TorusGeometry(1.36, 0.009, 8, 64);
    const ring2Mesh = new THREE.Mesh(ring2Geometry, torusMaterial);
    ring2Mesh.rotation.x = -Math.PI / 3;
    ring2Mesh.rotation.y = Math.PI / 6;
    orbitalGroup.add(ring2Mesh);

    // --- Orbiting Small White Spheres (Nodes) ---
    const nodes = [];
    const nodeCount = 6;
    const nodeGeometry = new THREE.SphereGeometry(0.052, 16, 16);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // Matching matte white spheres
      roughness: 0.45,
      metalness: 0.1
    });

    // Orbit parameters
    const nodeRadii = [1.32, 1.45, 1.55, 1.38, 1.5, 1.4];
    const nodeSpeeds = [0.8, 1.2, 0.6, 1.0, 1.4, 0.7];
    const nodeOffsets = [0.0, Math.PI / 3, Math.PI / 1.5, Math.PI, Math.PI / 0.8, Math.PI * 1.5];

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      scene.add(mesh);

      nodes.push({
        mesh: mesh,
        radius: nodeRadii[i],
        speed: nodeSpeeds[i],
        offset: nodeOffsets[i],
        angle: Math.random() * Math.PI * 2
      });
    }

    // --- Dynamic Color Configurations Based on Theme ---
    const updateThemeColors = (currentTheme) => {
      if (currentTheme === 'dark') {
        pointLightA.color.setHex(0x00f2fe); // Cyan Neon
        pointLightB.color.setHex(0x9b51e0); // Neon purple
        pointLightA.intensity = 15;
        pointLightB.intensity = 15;
        upwardLight.color.setHex(0xffffff);
        upwardLight.intensity = 18;
        ambientLight.intensity = 0.35;

        shellMaterial.color.setHex(0x00f2fe);
        ringMaterial.color.setHex(0x00f2fe);
        pedestalMaterial.color.setHex(0x0f172a);
        ringMaterial.color.setHex(0x9b51e0); // tab highlight
      } else {
        pointLightA.color.setHex(0xd97706); // Copper Orange from screenshot
        pointLightB.color.setHex(0x2563eb); // Deep blue highlight
        pointLightA.intensity = 18;
        pointLightB.intensity = 12;
        upwardLight.color.setHex(0xfef08a); // Warm light source
        upwardLight.intensity = 20;
        ambientLight.intensity = 0.85;

        shellMaterial.color.setHex(0xd97706); // Orange vector wireframe shell
        ringMaterial.color.setHex(0xd97706); // Orange base outline
        pedestalMaterial.color.setHex(0x1e293b); // Slate base disc
        ringMaterial.color.setHex(0x94a3b8); // Grey tori
      }
    };

    // Apply starting colors
    updateThemeColors(theme);

    // --- Mouse & Touch Listeners Tracked Globally on Window ---
    const handleMouseMove = (event) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = event.clientX;
      const y = event.clientY;
      
      mouse.current.targetX = (x / width) * 2 - 1;
      mouse.current.targetY = -(y / height) * 2 + 1;
    };

    const handleTouchMove = (event) => {
      if (event.touches.length === 0) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;
      
      mouse.current.targetX = (x / width) * 2 - 1;
      mouse.current.targetY = -(y / height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // --- Window Resize Listener ---
    const handleResize = () => {
      if (!containerRef.current) return;
      let w = containerRef.current.clientWidth;
      let h = containerRef.current.clientHeight;
      if (w === 0 || h === 0) {
        w = window.innerWidth;
        h = window.innerHeight;
      }
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const deltaTime = clock.getDelta();

      // 0. Update themes in render loop reactively
      const activeTheme = themeRef.current;
      if (activeTheme !== lastTheme.current) {
        lastTheme.current = activeTheme;
        updateThemeColors(activeTheme);
      }

      // 1. Parallax rotation tilt based on mouse position
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Tilts screen plate elegantly
      displayGroup.rotation.y = elapsedTime * 0.12 + mouse.current.x * 0.28;
      displayGroup.rotation.x = -0.06 - (mouse.current.y * 0.15);

      // Display floating height drift
      displayGroup.position.y = 0.1 + Math.sin(elapsedTime * 1.0) * 0.06;

      // Slowly rotate technical rings & shell
      shellMesh.rotation.y = elapsedTime * 0.2;
      shellMesh.rotation.x = elapsedTime * 0.08;
      orbitalGroup.rotation.z = -elapsedTime * 0.15;

      // 2. Animate floating 3D white node spheres around the globe
      nodes.forEach(n => {
        n.angle += n.speed * deltaTime;
        
        // Spherical coordinate orbit equations
        n.mesh.position.x = displayGroup.position.x + Math.cos(n.angle) * n.radius;
        n.mesh.position.z = displayGroup.position.z + Math.sin(n.angle) * n.radius * Math.cos(n.offset);
        n.mesh.position.y = displayGroup.position.y + Math.sin(n.angle) * n.radius * Math.sin(n.offset);
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup logic ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      // Clean up resources recursively
      globeGeometry.dispose();
      globeMaterial.dispose();
      
      shellGeometry.dispose();
      shellMaterial.dispose();
      
      pedestalGeometry.dispose();
      pedestalMaterial.dispose();

      ringGeometry.dispose();
      ringMaterial.dispose();

      ring1Geometry.dispose();
      ring2Geometry.dispose();
      torusMaterial.dispose();

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      
      nodes.forEach(n => {
        scene.remove(n.mesh);
      });

      renderer.dispose();
    };
  }, []);

  // WebGL Fallback layout
  if (!hasWebGL) {
    return (
      <div 
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0
        }}
      >
        <div style={{
          position: 'absolute',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.18,
          animation: 'pulseGlow 4s infinite alternate'
        }} />
        <div style={{ fontSize: '6rem', animation: 'float 3s ease-in-out infinite' }}>🔮</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
      }}
      className="creative-canvas-container"
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute', 
          inset: 0,
          width: '100%', 
          height: '100%',
          outline: 'none',
          display: 'block'
        }} 
      />
    </div>
  );
}
