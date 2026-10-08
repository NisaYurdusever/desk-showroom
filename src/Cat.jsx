import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

const CREAM = "#f4efe6";

export default function Cat({ color, sleeping }) {
  const root = useRef();
  const body = useRef();
  const head = useRef();
  const tail = useRef();
  const eyes = useRef([]);
  const excited = useRef(0);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    excited.current = Math.max(0, excited.current - dt);
    const happy = excited.current > 0;

    // kafa: imleci takip eder, uyurken öne düşer
    const px = sleeping ? 0 : state.pointer.x;
    const py = sleeping ? -0.9 : state.pointer.y;
    head.current.rotation.y = MathUtils.damp(head.current.rotation.y, px * 0.7, 5, dt);
    head.current.rotation.x = MathUtils.damp(head.current.rotation.x, -py * 0.35, 5, dt);

    // kuyruk
    const speed = happy ? 9 : sleeping ? 0.8 : 2.2;
    const amp = happy ? 0.55 : 0.25;
    tail.current.rotation.y = Math.sin(t * speed) * amp;

    // zıplama ve nefes
    root.current.position.y = happy ? Math.abs(Math.sin(t * 10)) * 0.06 : 0;
    body.current.scale.y = 1.25 + Math.sin(t * 2) * 0.02;

    // göz kırpma: uyurken kapalı, uyanıkken 4 sn'de bir
    const closed = sleeping || t % 4 > 3.85;
    eyes.current.forEach((e) => {
      if (e) e.scale.y = MathUtils.damp(e.scale.y, closed ? 0.08 : 1, 25, dt);
    });
  });

  return (
    <group ref={root} rotation={[0, 0.7, 0]} onClick={() => (excited.current = 1.4)}>
      {/* gövde */}
      <mesh ref={body} position={[0, 0.2, 0]} scale={[1, 1.25, 0.95]} castShadow>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {/* göğüs */}
      <mesh position={[0, 0.2, 0.12]} scale={[0.9, 1.3, 0.6]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={CREAM} roughness={0.9} />
      </mesh>

      {/* arka bacaklar */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.11, 0.1, -0.03]} scale={[0.8, 1, 1.2]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
      ))}

      {/* ön bacaklar ve patiler */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.06, 0.1, 0.13]} castShadow>
            <capsuleGeometry args={[0.03, 0.12, 4, 8]} />
            <meshStandardMaterial color={color} roughness={0.9} />
          </mesh>
          <mesh position={[s * 0.06, 0.025, 0.155]} scale={[1, 0.7, 1.3]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color={CREAM} roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* kuyruk: dıştaki grup yana sallanır, içteki geriye yatık */}
      <group ref={tail} position={[0, 0.07, -0.16]}>
        <group rotation={[-1.0, 0, 0]}>
          <mesh position={[0, 0.16, 0]} castShadow>
            <capsuleGeometry args={[0.025, 0.28, 4, 8]} />
            <meshStandardMaterial color={color} roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* kafa: boyun noktasından döner */}
      <group ref={head} position={[0, 0.42, 0.04]}>
        <mesh scale={[1.1, 0.95, 1]} castShadow>
          <sphereGeometry args={[0.105, 24, 24]} />
          <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>

        {/* kulaklar */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.07, 0.1, 0]} rotation={[0, 0, -s * 0.3]} castShadow>
            <coneGeometry args={[0.045, 0.09, 4]} />
            <meshStandardMaterial color={color} roughness={0.9} />
          </mesh>
        ))}

        {/* ağız burun bölgesi */}
        <mesh position={[0, -0.035, 0.08]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color={CREAM} roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.015, 0.115]}>
          <sphereGeometry args={[0.012, 12, 12]} />
          <meshStandardMaterial color="#e8909a" />
        </mesh>

        {/* gözler */}
        {[-1, 1].map((s, i) => (
          <group key={s} ref={(el) => (eyes.current[i] = el)} position={[s * 0.045, 0.015, 0.092]}>
            <mesh scale={[1, 1, 0.5]}>
              <sphereGeometry args={[0.022, 12, 12]} />
              <meshStandardMaterial color="#9be15d" emissive="#9be15d" emissiveIntensity={0.15} />
            </mesh>
            <mesh position={[0, 0, 0.01]} scale={[0.4, 1.4, 0.5]}>
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshBasicMaterial color="#111" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}