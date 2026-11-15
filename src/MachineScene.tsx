import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Float, OrbitControls } from '@react-three/drei'

function Wheel({ position }: { position: [number, number, number] }) {
  return <group position={position} rotation={[0, 0, Math.PI / 2]}>
    <mesh castShadow><cylinderGeometry args={[0.34, 0.34, 0.22, 40]} /><meshStandardMaterial color="#101010" roughness={0.86} /></mesh>
    <mesh><cylinderGeometry args={[0.19, 0.19, 0.232, 32]} /><meshStandardMaterial color="#b7a58d" metalness={0.78} roughness={0.32} /></mesh>
    <mesh><cylinderGeometry args={[0.075, 0.075, 0.24, 24]} /><meshStandardMaterial color="#24211e" metalness={0.45} roughness={0.4} /></mesh>
  </group>
}
function ConceptCar() {
  return <Float speed={0.65} rotationIntensity={0.035} floatIntensity={0.12}>
    <group position={[0, 0.28, 0]} rotation={[0, -0.24, 0]}>
      <mesh castShadow position={[0, 0.24, 0]}><boxGeometry args={[0.78, 0.22, 2.55]} /><meshStandardMaterial color="#b50912" metalness={0.42} roughness={0.28} /></mesh>
      <mesh castShadow position={[0, 0.24, 1.38]} rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[0.31, 1.05, 4]} /><meshStandardMaterial color="#d10b13" metalness={0.35} roughness={0.25} /></mesh>
      <mesh castShadow position={[0, 0.43, -0.08]}><boxGeometry args={[0.57, 0.2, 0.85]} /><meshStandardMaterial color="#171513" metalness={0.35} roughness={0.3} /></mesh>
      <mesh castShadow position={[0, 0.65, -0.12]}><sphereGeometry args={[0.27, 24, 16]} /><meshStandardMaterial color="#090909" metalness={0.25} roughness={0.2} /></mesh>
      <mesh castShadow position={[0, 0.77, -1.12]}><boxGeometry args={[1.55, 0.09, 0.34]} /><meshStandardMaterial color="#a80a10" metalness={0.35} roughness={0.3} /></mesh>
      <mesh castShadow position={[0, 0.38, 1.86]}><boxGeometry args={[2.05, 0.08, 0.34]} /><meshStandardMaterial color="#c9b28f" metalness={0.48} roughness={0.35} /></mesh>
      <mesh castShadow position={[0, 0.5, 1.82]}><boxGeometry args={[0.12, 0.25, 0.08]} /><meshStandardMaterial color="#a80a10" /></mesh>
      <mesh castShadow position={[0, 0.68, -1.15]}><boxGeometry args={[0.12, 0.38, 0.08]} /><meshStandardMaterial color="#a80a10" /></mesh>
      <Wheel position={[-0.63, 0.05, 1.02]} /><Wheel position={[0.63, 0.05, 1.02]} />
      <Wheel position={[-0.63, 0.05, -0.92]} /><Wheel position={[0.63, 0.05, -0.92]} />
      <mesh position={[0, 0.92, -0.12]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.32, 0.035, 8, 36]} /><meshStandardMaterial color="#c9b28f" metalness={0.8} roughness={0.25} /></mesh>
      <mesh position={[0, 0.2, 0]}><boxGeometry args={[1.2, 0.05, 2.9]} /><meshStandardMaterial color="#171513" metalness={0.2} roughness={0.6} /></mesh>
    </group>
  </Float>
}
export default function MachineScene() {
  return <Canvas shadows dpr={[1, 1.7]} camera={{ position: [4.8, 3.1, 5.8], fov: 34 }} gl={{ antialias: true, alpha: true }}>
    <color attach="background" args={['#100d0c']} />
    <ambientLight intensity={1.25} />
    <directionalLight position={[4, 7, 5]} intensity={3.1} castShadow />
    <pointLight position={[-4, 2, -3]} intensity={1.6} color="#b50912" />
    <Suspense fallback={null}><ConceptCar /><ContactShadows position={[0, -0.08, 0]} opacity={0.42} scale={7} blur={2.8} far={4} /></Suspense>
    <OrbitControls enablePan={false} minDistance={4.2} maxDistance={10} minPolarAngle={0.45} maxPolarAngle={1.45} autoRotate autoRotateSpeed={0.32} />
  </Canvas>
}
