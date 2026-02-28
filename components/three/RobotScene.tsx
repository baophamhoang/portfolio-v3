'use client'

import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Pre-computed particle orbit params ───────────────────────────────────────
const PARTICLE_COUNT = 10
const particleParams = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  baseAngle: (i / PARTICLE_COUNT) * Math.PI * 2,
  radius: 0.68 + (i % 3) * 0.08,
  speed: 0.28 + (i % 5) * 0.06,
  elev: (i % 2 === 0 ? 1 : -1) * (0.1 + (i % 3) * 0.07),
}))

// ─── Gem ─────────────────────────────────────────────────────────────────────
function Gem() {
  const orbRef = useRef<THREE.Group>(null)
  const shellRef = useRef<THREE.Group>(null)
  const ringAGroupRef = useRef<THREE.Group>(null)
  const ringBGroupRef = useRef<THREE.Group>(null)
  const coreMatRef = useRef<THREE.MeshStandardMaterial>(null)
  const wireMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const ringAMatRef = useRef<THREE.MeshStandardMaterial>(null)
  const particleRefs = useRef<(THREE.Mesh | null)[]>(Array(PARTICLE_COUNT).fill(null))

  const hoveredRef = useRef(false)
  const isDragRef = useRef(false)
  const lastXRef = useRef(0)
  const lastYRef = useRef(0)
  const rotYRef = useRef(0)
  const rotXRef = useRef(0)
  const velYRef = useRef(0)
  const velXRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  const { gl } = useThree()

  // Mouse tracking for gentle drift (ref — no stale closures)
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Drag pointer handlers on canvas element
  useEffect(() => {
    const el = gl.domElement

    const onMove = (e: PointerEvent) => {
      if (!isDragRef.current) return
      const dx = e.clientX - lastXRef.current
      const dy = e.clientY - lastYRef.current
      rotYRef.current += dx * 0.016
      rotXRef.current += dy * 0.016
      velYRef.current = dx * 0.016
      velXRef.current = dy * 0.016
      lastXRef.current = e.clientX
      lastYRef.current = e.clientY
    }

    const onUp = () => {
      isDragRef.current = false
      el.style.cursor = hoveredRef.current ? 'grab' : 'default'
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [gl])

  useFrame((state) => {
    if (!orbRef.current || !shellRef.current) return
    const t = state.clock.elapsedTime

    // Float
    orbRef.current.position.y = Math.sin(t * 0.65) * 0.09

    // Shell counter-rotation (inner life)
    shellRef.current.rotation.y -= 0.006
    shellRef.current.rotation.x += 0.003

    // Ring A — Z spin
    if (ringAGroupRef.current) ringAGroupRef.current.rotation.z = t * 0.38

    // Ring B — X+Y spin (inside static-tilt wrapper)
    if (ringBGroupRef.current) {
      ringBGroupRef.current.rotation.x = t * 0.27
      ringBGroupRef.current.rotation.y = -t * 0.17
    }

    // Drag vs idle rotation (X + Y)
    if (isDragRef.current) {
      orbRef.current.rotation.y = rotYRef.current
      orbRef.current.rotation.x = rotXRef.current
    } else {
      // Y — momentum decay + auto-rotate + mouse drift
      rotYRef.current += velYRef.current
      velYRef.current *= 0.94
      if (Math.abs(velYRef.current) < 0.002) {
        velYRef.current = 0
        rotYRef.current += 0.0022
      }
      orbRef.current.rotation.y = THREE.MathUtils.lerp(
        orbRef.current.rotation.y,
        rotYRef.current + mouseRef.current.x * 0.18,
        0.06,
      )

      // X — momentum decay then ease back to neutral
      rotXRef.current += velXRef.current
      velXRef.current *= 0.94
      if (Math.abs(velXRef.current) < 0.002) {
        velXRef.current = 0
        rotXRef.current = THREE.MathUtils.lerp(rotXRef.current, 0, 0.03)
      }
      orbRef.current.rotation.x = rotXRef.current
    }

    // Core emissive pulse
    if (coreMatRef.current) {
      coreMatRef.current.emissiveIntensity =
        (Math.sin(t * 2.2) * 0.3 + 0.7) * (hoveredRef.current ? 2.4 : 1.4)
    }

    // Wireframe opacity lerp
    if (wireMatRef.current) {
      wireMatRef.current.opacity = THREE.MathUtils.lerp(
        wireMatRef.current.opacity,
        hoveredRef.current ? 0.72 : 0.45,
        0.08,
      )
    }

    // Ring A emissive lerp
    if (ringAMatRef.current) {
      ringAMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        ringAMatRef.current.emissiveIntensity,
        hoveredRef.current ? 1.8 : 0.9,
        0.08,
      )
    }

    // Particle positions + emissive
    particleRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const p = particleParams[i]
      const angle = p.baseAngle + t * p.speed
      mesh.position.set(
        Math.cos(angle) * p.radius,
        p.elev + Math.sin(t * 0.45 + i) * 0.055,
        Math.sin(angle) * p.radius,
      )
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        hoveredRef.current ? 2.5 : 1.0,
        0.08,
      )
    })
  })

  return (
    <group
      ref={orbRef}
      onPointerOver={() => {
        hoveredRef.current = true
        if (!isDragRef.current) gl.domElement.style.cursor = 'grab'
      }}
      onPointerOut={() => {
        hoveredRef.current = false
        if (!isDragRef.current) gl.domElement.style.cursor = 'default'
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        isDragRef.current = true
        lastXRef.current = e.clientX
        lastYRef.current = e.clientY
        rotYRef.current = orbRef.current?.rotation.y ?? 0
        rotXRef.current = orbRef.current?.rotation.x ?? 0
        velYRef.current = 0
        velXRef.current = 0
        gl.domElement.style.cursor = 'grabbing'
      }}
    >
      {/* ─── Shell group — self-rotates for inner life ─── */}
      <group ref={shellRef}>
        {/* Core */}
        <mesh>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshStandardMaterial
            ref={coreMatRef}
            color="#F59E0B"
            emissive="#F59E0B"
            emissiveIntensity={1.4}
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>

        {/* Solid shell */}
        <mesh>
          <icosahedronGeometry args={[0.52, 0]} />
          <meshStandardMaterial
            color="#F59E0B"
            opacity={0.1}
            transparent
            roughness={0.3}
            metalness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Wireframe shell */}
        <mesh>
          <icosahedronGeometry args={[0.535, 0]} />
          <meshBasicMaterial
            ref={wireMatRef}
            color="#F7F3EC"
            wireframe
            opacity={0.45}
            transparent
          />
        </mesh>
      </group>

      {/* ─── Ring A — amber, rotates Z ─── */}
      <group ref={ringAGroupRef}>
        <mesh>
          <torusGeometry args={[0.82, 0.013, 8, 64]} />
          <meshStandardMaterial
            ref={ringAMatRef}
            color="#F59E0B"
            emissive="#F59E0B"
            emissiveIntensity={0.9}
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>
      </group>

      {/* ─── Ring B — cream, ~56° static tilt, animated inner ─── */}
      <group rotation={[(Math.PI * 56) / 180, 0, 0]}>
        <group ref={ringBGroupRef}>
          <mesh>
            <torusGeometry args={[0.82, 0.013, 8, 64]} />
            <meshStandardMaterial
              color="#F7F3EC"
              opacity={0.6}
              transparent
              roughness={0.2}
              metalness={0.3}
            />
          </mesh>
        </group>
      </group>

      {/* ─── Particles ─── */}
      {particleParams.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            particleRefs.current[i] = el
          }}
        >
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#F59E0B"
            emissiveIntensity={1.0}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* ─── Inner amber glow ─── */}
      <pointLight position={[0, 0, 0]} color="#F59E0B" intensity={1.5} distance={3} />
    </group>
  )
}

// ─── Scene wrapper ────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} color="#FFF8F0" />
      <directionalLight position={[2, 3, 3]} intensity={0.8} color="#FFFFFF" />
      <directionalLight position={[-2, 0, -1]} intensity={0.2} color="#C4B5A0" />
      <Suspense fallback={null}>
        <Gem />
      </Suspense>
    </>
  )
}

// ─── Exported Canvas ─────────────────────────────────────────────────────────
export default function RobotScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 44 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}
