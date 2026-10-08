import { DoubleSide } from "three";

export default function Lamp({ color, lightOn, lightColor, intensity }) {
  return (
    <group>
      {/* taban */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.06, 32]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} />
      </mesh>

      {/* kol */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 16]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* abajur (içi boş koni, ışık açıkken parlar) */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.14, 0.25, 0.3, 32, 1, true]} />
        <meshStandardMaterial
          color="#f5efe6"
          side={DoubleSide}
          emissive={lightColor}
          emissiveIntensity={lightOn ? 0.8 : 0}
        />
      </mesh>

      {/* ışık kaynağı */}
      <pointLight
        position={[0, 0.78, 0]}
        color={lightColor}
        intensity={lightOn ? intensity : 0}
        distance={5}
        decay={2}
      />
    </group>
  );
}