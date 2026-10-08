const FINISHES = {
  mat:    { metalness: 0.0, roughness: 0.9 },
  parlak: { metalness: 0.1, roughness: 0.15 },
  metal:  { metalness: 1.0, roughness: 0.25 },
};

export const FINISH_NAMES = Object.keys(FINISHES);

export default function Headphones({ color, finish }) {
  const mat = FINISHES[finish];
  const cy = 0.14; // kulaklıkların merkez yüksekliği

  return (
    <group>
      {/* stand: taban + direk */}
      <mesh position={[0, 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.11, 0.02, 32]} />
        <meshStandardMaterial color="#2b2d42" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.155, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.29, 16]} />
        <meshStandardMaterial color="#2b2d42" roughness={0.6} />
      </mesh>

      {/* kafa bandı: yarım halka */}
      <mesh position={[0, cy, 0]} castShadow>
        <torusGeometry args={[0.17, 0.014, 16, 48, Math.PI]} />
        <meshStandardMaterial color={color} {...mat} />
      </mesh>

      {/* kulaklıklar (sol ve sağ) */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.14, cy, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.05, 32]} />
            <meshStandardMaterial color={color} {...mat} />
          </mesh>
          {/* yastık */}
          <mesh position={[0, -side * 0.035, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.025, 32]} />
            <meshStandardMaterial color="#1d1d1f" roughness={0.95} />
          </mesh>
        </group>
      ))}
    </group>
  );
}