export default function Phone({ color, screen }) {
  return (
    <group position={[0, 0.17, 0]} rotation={[-0.25, 0, 0]}>
      {/* gövde */}
      <mesh castShadow>
        <boxGeometry args={[0.16, 0.32, 0.015]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* ekran */}
      <mesh position={[0, 0, 0.0085]}>
        <planeGeometry args={[0.145, 0.3]} />
        <meshStandardMaterial color={screen} emissive={screen} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}