const STARS = [
  [-0.6, 0.4], [-0.2, 0.15], [0.3, 0.45], [0.6, 0.1], [-0.4, -0.2], [0.1, -0.35], [0.65, -0.3],
];

export default function Room({ night, wall }) {
  return (
    <group>
      {/* masa ayakları */}
      {[[-1.85, -0.85], [1.85, -0.85], [-1.85, 0.85], [1.85, 0.85]].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, -0.5, z]}>
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <meshStandardMaterial color="#8a6642" />
        </mesh>
      ))}

      {/* zemin */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#d9c8b4" />
      </mesh>

      {/* arka duvar */}
      <mesh position={[0, 1.1, -2.2]}>
        <planeGeometry args={[12, 4]} />
        <meshStandardMaterial color={wall} />
      </mesh>

      {/* sol duvar */}
      <mesh position={[-3.2, 1.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[12, 4]} />
        <meshStandardMaterial color={wall} />
      </mesh>

      {/* pencere */}
      <group position={[-0.5, 1.3, -2.19]}>
        <mesh>
          <planeGeometry args={[1.8, 1.3]} />
          <meshBasicMaterial color={night ? "#141b3a" : "#bfe3ff"} toneMapped={false} />
        </mesh>

        {night &&
          STARS.map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0.005]}>
              <circleGeometry args={[0.012, 8]} />
              <meshBasicMaterial color="#fffbe6" toneMapped={false} />
            </mesh>
          ))}

        {/* çerçeve */}
        {[
          [[0, 0.69, 0.02], [1.9, 0.08, 0.06]],
          [[0, -0.69, 0.02], [1.9, 0.08, 0.06]],
          [[-0.91, 0, 0.02], [0.08, 1.38, 0.06]],
          [[0.91, 0, 0.02], [0.08, 1.38, 0.06]],
          [[0, 0, 0.02], [0.04, 1.3, 0.04]],
          [[0, 0, 0.02], [1.8, 0.04, 0.04]],
        ].map(([pos, size], i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={size} />
            <meshStandardMaterial color="#f5f0e8" />
          </mesh>
        ))}
      </group>

      {/* pencereden giren ışık */}
      <pointLight
        position={[-0.5, 1.3, -1.6]}
        color={night ? "#6f8cff" : "#fff3d6"}
        intensity={night ? 0.8 : 2}
        distance={8}
        decay={2}
      />
    </group>
  );
}