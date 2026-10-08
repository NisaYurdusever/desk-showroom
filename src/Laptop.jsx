import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

const CLOSED = Math.PI / 2 - 0.02;
const OPEN = -0.3;

export default function Laptop({ color, screen, open }) {
  const lid = useRef();

  useFrame((_, dt) => {
    if (!lid.current) return;
    const target = open ? OPEN : CLOSED;
    lid.current.rotation.x = MathUtils.damp(lid.current.rotation.x, target, 6, dt);
  });

  return (
    <group>
      {/* taban */}
      <mesh position={[0, 0.015, 0]} castShadow>
        <boxGeometry args={[0.7, 0.03, 0.48]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} />
      </mesh>

      {/* kapak: menteşe noktasından döner */}
      <group ref={lid} position={[0, 0.04, -0.24]} rotation={[CLOSED, 0, 0]}>
        <mesh position={[0, 0.23, 0]} castShadow>
          <boxGeometry args={[0.7, 0.46, 0.02]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.23, 0.0105]}>
          <planeGeometry args={[0.64, 0.4]} />
          <meshStandardMaterial color={screen} emissive={screen} emissiveIntensity={open ? 0.6 : 0} />
        </mesh>
      </group>
    </group>
  );
}