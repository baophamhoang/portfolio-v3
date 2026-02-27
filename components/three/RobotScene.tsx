'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface MousePos {
  x: number
  y: number
}

// ─── Eye component ────────────────────────────────────────────────────────────
function Eye({
  position,
  mouse,
  hovered,
}: {
  position: [number, number, number]
  mouse: MousePos
  hovered: boolean
}) {
  const eyeRef = useRef<THREE.Group>(null)
  const pupilRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!eyeRef.current || !pupilRef.current) return

    // Pupil tracking
    const targetX = mouse.x * 0.06
    const targetY = -mouse.y * 0.06

    pupilRef.current.position.x = THREE.MathUtils.lerp(
      pupilRef.current.position.x,
      targetX,
      0.08
    )
    pupilRef.current.position.y = THREE.MathUtils.lerp(
      pupilRef.current.position.y,
      targetY,
      0.08
    )
  })

  const scale = hovered ? 1.2 : 1

  return (
    <group ref={eyeRef} position={position}>
      {/* Eyeball */}
      <mesh scale={[scale, scale, scale]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial color="#0F1923" roughness={0.1} metalness={0.2} />
      </mesh>
      {/* Iris glow */}
      <mesh scale={[scale, scale, scale]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={hovered ? 3 : 1.8}
          roughness={0}
        />
      </mesh>
      {/* Pupil */}
      <mesh ref={pupilRef} position={[0, 0, 0.045]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshStandardMaterial color="#000000" roughness={0} />
      </mesh>
      {/* Specular highlight */}
      <mesh position={[0.025, 0.025, 0.05]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
    </group>
  )
}

// ─── Antenna ─────────────────────────────────────────────────────────────────
function Antenna({ hovered }: { hovered: boolean }) {
  const tipRef = useRef<THREE.Mesh>(null)
  const emissiveRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (!tipRef.current || !emissiveRef.current) return
    const t = state.clock.elapsedTime
    // Blinking LED
    emissiveRef.current.emissiveIntensity = Math.sin(t * 3) * 0.5 + 1.5
    // Wobble on hover
    if (hovered) {
      tipRef.current.position.x = Math.sin(t * 8) * 0.02
    }
  })

  return (
    <group position={[-0.22, 1.0, 0]}>
      {/* Pole */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.36, 8]} />
        <meshStandardMaterial color="#8C7260" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Ball joint */}
      <mesh position={[0, 0.36, 0]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshStandardMaterial color="#C4B5A0" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* LED tip */}
      <mesh ref={tipRef} position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          ref={emissiveRef}
          color="#EF4444"
          emissive="#EF4444"
          emissiveIntensity={1.5}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

// ─── Key on keyboard ─────────────────────────────────────────────────────────
function Key({
  position,
  label,
}: {
  position: [number, number, number]
  label?: string
}) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.09, 0.05, 0.09]} />
        <meshStandardMaterial color="#EEE7D9" roughness={0.9} />
      </mesh>
    </group>
  )
}

// ─── Main Robot ───────────────────────────────────────────────────────────────
function Robot({ mouse }: { mouse: MousePos }) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const bounceRef = useRef(0)

  useFrame((state) => {
    if (!groupRef.current || !headRef.current) return
    const t = state.clock.elapsedTime

    // Gentle floating
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.08

    // Subtle whole-body tilt toward mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.25,
      0.04
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.15,
      0.04
    )

    // Head nod on hover
    if (hovered) {
      headRef.current.rotation.z = Math.sin(t * 2) * 0.04
    } else {
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.05)
    }

    // Click bounce
    if (clicked) {
      bounceRef.current = Math.min(bounceRef.current + 0.3, Math.PI)
      groupRef.current.position.y += Math.sin(bounceRef.current) * 0.15
      if (bounceRef.current >= Math.PI) {
        bounceRef.current = 0
        setClicked(false)
      }
    }
  })

  const bodyColor = '#F5F0E8'
  const accentColor = '#E8E3D8'
  const screenColor = '#0F1923'

  return (
    <group
      ref={groupRef}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={() => setClicked(true)}
    >
      {/* ─── HEAD / MONITOR ─── */}
      <group ref={headRef} position={[0, 0.55, 0]}>
        {/* Monitor shell */}
        <mesh castShadow>
          <boxGeometry args={[1.05, 0.88, 0.38]} />
          <meshStandardMaterial color={bodyColor} roughness={0.85} metalness={0.05} />
        </mesh>

        {/* Screen bezel (darker inset) */}
        <mesh position={[0, 0, 0.19]}>
          <boxGeometry args={[0.88, 0.72, 0.01]} />
          <meshStandardMaterial color="#1A1815" roughness={0.6} />
        </mesh>

        {/* Screen glass */}
        <mesh position={[0, 0.02, 0.196]}>
          <boxGeometry args={[0.8, 0.62, 0.01]} />
          <meshStandardMaterial
            color={screenColor}
            roughness={0.05}
            metalness={0.3}
            emissive="#071423"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Eyes */}
        <Eye position={[-0.175, 0.07, 0.21]} mouse={mouse} hovered={hovered} />
        <Eye position={[0.175, 0.07, 0.21]} mouse={mouse} hovered={hovered} />

        {/* Mouth — pixel smile */}
        <mesh position={[-0.1, -0.16, 0.205]}>
          <boxGeometry args={[0.06, 0.025, 0.005]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0, -0.18, 0.205]}>
          <boxGeometry args={[0.12, 0.025, 0.005]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.1, -0.16, 0.205]}>
          <boxGeometry args={[0.06, 0.025, 0.005]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.6} />
        </mesh>

        {/* Power LED */}
        <mesh position={[0.38, -0.32, 0.15]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial
            color="#22C55E"
            emissive="#22C55E"
            emissiveIntensity={hovered ? 3 : 1.5}
          />
        </mesh>

        {/* Side vents */}
        {[-0.33, -0.2, -0.07, 0.06].map((y, i) => (
          <mesh key={i} position={[-0.53, y, 0]}>
            <boxGeometry args={[0.01, 0.04, 0.2]} />
            <meshStandardMaterial color={accentColor} roughness={0.9} />
          </mesh>
        ))}

        {/* Antenna */}
        <Antenna hovered={hovered} />

        {/* Monitor bottom ridge */}
        <mesh position={[0, -0.46, 0]}>
          <boxGeometry args={[1.05, 0.04, 0.38]} />
          <meshStandardMaterial color={accentColor} roughness={0.9} />
        </mesh>
      </group>

      {/* ─── NECK ─── */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.2, 0.18, 0.2]} />
        <meshStandardMaterial color={accentColor} roughness={0.9} />
      </mesh>

      {/* ─── BODY / KEYBOARD ─── */}
      <mesh position={[0, -0.14, 0]} castShadow>
        <boxGeometry args={[1.15, 0.2, 0.52]} />
        <meshStandardMaterial color={bodyColor} roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Keyboard surface */}
      <mesh position={[0, -0.03, 0.04]}>
        <boxGeometry args={[0.98, 0.01, 0.38]} />
        <meshStandardMaterial color={accentColor} roughness={0.95} />
      </mesh>

      {/* Keys grid */}
      {[
        [-0.35, -0.03, 0.14], [-0.22, -0.03, 0.14], [-0.09, -0.03, 0.14],
        [0.04, -0.03, 0.14], [0.17, -0.03, 0.14], [0.30, -0.03, 0.14],
        [-0.28, -0.03, 0.04], [-0.15, -0.03, 0.04], [-0.02, -0.03, 0.04],
        [0.11, -0.03, 0.04], [0.24, -0.03, 0.04],
      ].map((pos, i) => (
        <Key key={i} position={pos as [number, number, number]} />
      ))}

      {/* Spacebar */}
      <mesh position={[0, -0.03, -0.08]}>
        <boxGeometry args={[0.38, 0.04, 0.09]} />
        <meshStandardMaterial color="#EEE7D9" roughness={0.9} />
      </mesh>

      {/* Body front indicator strip */}
      <mesh position={[0.38, -0.14, 0.27]}>
        <boxGeometry args={[0.12, 0.06, 0.01]} />
        <meshStandardMaterial color="#D97706" emissive="#D97706" emissiveIntensity={0.5} />
      </mesh>

      {/* ─── FEET ─── */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={i} position={[x, -0.3, 0]} castShadow>
          <boxGeometry args={[0.22, 0.1, 0.44]} />
          <meshStandardMaterial color={accentColor} roughness={0.9} />
        </mesh>
      ))}

      {/* Shadow blob underneath */}
      <mesh position={[0, -0.38, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 0.5, 1]}>
        <circleGeometry args={[0.65, 32]} />
        <meshStandardMaterial color="#000000" opacity={0.08} transparent />
      </mesh>

      {/* Screen glow point light */}
      <pointLight
        position={[0, 0.55, 0.6]}
        color="#F59E0B"
        intensity={hovered ? 1.5 : 0.6}
        distance={2}
      />
    </group>
  )
}

// ─── Scene wrapper ────────────────────────────────────────────────────────────
function Scene() {
  const [mouse, setMouse] = useState<MousePos>({ x: 0, y: 0 })
  const { size } = useThree()

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      <ambientLight intensity={0.7} color="#FFF8F0" />
      <directionalLight
        position={[2, 3, 3]}
        intensity={1.2}
        color="#FFFFFF"
        castShadow
      />
      <directionalLight position={[-2, 0, -1]} intensity={0.3} color="#C4B5A0" />
      <pointLight position={[0, 2, 4]} color="#F59E0B" intensity={0.4} />
      <Suspense fallback={null}>
        <Robot mouse={mouse} />
      </Suspense>
    </>
  )
}

// ─── Exported Canvas ─────────────────────────────────────────────────────────
export default function RobotScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.2], fov: 42 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}
