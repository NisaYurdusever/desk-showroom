import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls, ContactShadows, Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import Lamp from "./Lamp";
import Phone from "./Phone";
import Laptop from "./Laptop";
import Headphones, { FINISH_NAMES } from "./Headphones";
import Room from "./Room";
import Cat from "./Cat";

const aspect = window.innerWidth / window.innerHeight;
const s = aspect < 1 ? Math.min(2.6, 1.1 / aspect) : 1;
const HOME_VIEW = [2.5 * s, 2 * s, 3.5 * s, 0, 0, 0];

const PRODUCTS = {
  laptop: {
    label: "Laptop", position: [-1, 0, 0], lookY: 0.2,
    colors: ["#8d99ae", "#2b2d42", "#e9c46a"],
    screens: ["#4cc9f0", "#f72585", "#b5e48c"],
  },
  phone: {
    label: "Telefon", position: [0.2, 0, 0.5], lookY: 0.15,
    colors: ["#2b2d42", "#e63946", "#a8dadc"],
    screens: ["#f72585", "#4cc9f0", "#ffd166"],
  },
  headphones: {
  label: "Kulaklık", position: [1, 0, 0], lookY: 0.15,
  colors: ["#e63946", "#f1faee", "#457b9d"],
  finishes: true,
},
  lamp: {
    label: "Lamba", position: [1.6, 0, -0.5], lookY: 0.4,
    colors: ["#f4a261", "#2a9d8f", "#f1faee"],
  },
  cat: {
    label: "Kedi", position: [-1.5, 0, 0.6], lookY: 0.25,
    colors: ["#e08a3c", "#2b2b2e", "#9a9a9f", "#f4efe6"],
  },
};

function Swatches({ options, value, onPick, label }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 12, marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", gap: 8 }}>
        {options.map((c) => (
          <button
            key={c}
            onClick={() => onPick(c)}
            aria-label={`${label} ${c}`}
            style={{
              width: 32, height: 32, borderRadius: "50%", background: c, cursor: "pointer",
              border: value === c ? "3px solid #333" : "2px solid #ddd",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Product({ id, color, screen, finish, lamp, laptopOpen, night, onSelect }) {
  const { position } = PRODUCTS[id];
  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect(id); }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {id === "lamp" && (
        <Lamp color={color} lightOn={lamp.on} intensity={lamp.intensity} lightColor={lamp.warm ? "#ffb870" : "#cfe4ff"} />
      )}
      {id === "phone" && <Phone color={color} screen={screen} />}
      {id === "laptop" && <Laptop color={color} screen={screen} open={laptopOpen} />}
      {id === "headphones" && <Headphones color={color} finish={finish} />}
      {id === "cat" && <Cat color={color} sleeping={night} />}
    </group>
  );
}

function Panel({ id, colors, screens, finish, setFinish, setColor, setScreen, onBack, lamp, setLamp, laptopOpen, setLaptopOpen }) {
  const product = PRODUCTS[id];
  return (
    <div style={{ position: "absolute", top: 16, right: 16, background: "white", padding: 16, borderRadius: 12, minWidth: 200 }}>
      <h3 style={{ margin: "0 0 12px" }}>{product.label}</h3>

      <Swatches label="Renk" options={product.colors} value={colors[id]} onPick={(c) => setColor(id, c)} />

      {id === "cat" && (
        <div style={{ fontSize: 12, marginBottom: 12, opacity: 0.7 }}>
          Kediye tekrar tıkla :) Gece modunda uyur.
        </div>
      )}

      {product.screens && (
        <Swatches label="Ekran" options={product.screens} value={screens[id]} onPick={(c) => setScreen(id, c)} />
      )}

      {product.finishes && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, marginBottom: 4 }}>Yüzey</div>
          <div style={{ display: "flex", gap: 6 }}>
            {FINISH_NAMES.map((f) => (
              <button
                key={f}
                onClick={() => setFinish(f)}
                style={{ padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: finish === f ? 700 : 400, border: finish === f ? "2px solid #333" : "1px solid #ccc" }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {id === "laptop" && (
        <button onClick={() => setLaptopOpen(!laptopOpen)} style={{ marginBottom: 12, display: "block" }}>
          {laptopOpen ? "Kapağı kapat" : "Kapağı aç"}
        </button>
      )}

      {id === "lamp" && (
        <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
          <label><input type="checkbox" checked={lamp.on} onChange={(e) => setLamp({ ...lamp, on: e.target.checked })} /> Işık açık</label>
          <label><input type="checkbox" checked={lamp.warm} onChange={(e) => setLamp({ ...lamp, warm: e.target.checked })} /> Sıcak ışık</label>
          <label>
            Parlaklık
            <input type="range" min="0" max="6" step="0.1" value={lamp.intensity}
              onChange={(e) => setLamp({ ...lamp, intensity: Number(e.target.value) })} style={{ width: "100%" }} />
          </label>
        </div>
      )}

      <button onClick={onBack}>← Masaya dön</button>
    </div>
  );
}

export default function Scene() {
  const controls = useRef();
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const [selected, setSelected] = useState(null);
  const [night, setNight] = useState(false);
  const [low, setLow] = useState(coarse);
  const [wall, setWall] = useState("#e8dccb");
  const [finish, setFinish] = useState("mat");
  const [lamp, setLamp] = useState({ on: true, intensity: 3, warm: true });
  const [laptopOpen, setLaptopOpen] = useState(true);
  const [colors, setColors] = useState(
    Object.fromEntries(Object.entries(PRODUCTS).map(([id, p]) => [id, p.colors[0]]))
  );
  const [screens, setScreens] = useState(
    Object.fromEntries(Object.entries(PRODUCTS).filter(([, p]) => p.screens).map(([id, p]) => [id, p.screens[0]]))
  );

  const select = (id) => {
    setSelected(id);
    if (id) {
      const [x, y, z] = PRODUCTS[id].position;
      const ty = y + PRODUCTS[id].lookY;
      controls.current?.setLookAt(x + 1, ty + 1, z + 1.5, x, ty, z, true);
    } else {
      controls.current?.setLookAt(...HOME_VIEW, true);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Canvas
        dpr={low ? 1 : [1, 1.5]}
        camera={{ position: HOME_VIEW.slice(0, 3), fov: 40 }}
        onPointerMissed={() => selected && select(null)}
      >
        <PerformanceMonitor onDecline={() => setLow(true)} />
        <color attach="background" args={[night ? "#14161f" : "#f3ece4"]} />
        <ambientLight intensity={night ? 0.08 : 0.5} />
        <directionalLight position={[3, 5, 2]} intensity={night ? 0.05 : 1} />
        <Environment resolution={256} environmentIntensity={night ? 0.1 : 1}>
          <Lightformer form="rect" intensity={2} position={[0, 5, -5]} scale={[10, 5, 1]} />
          <Lightformer form="rect" intensity={1} position={[-5, 2, 3]} scale={[6, 4, 1]} />
          <Lightformer form="ring" intensity={1.5} position={[4, 3, 2]} scale={4} />
        </Environment>
        <Room night={night} wall={wall} />

        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[4, 0.1, 2]} />
          <meshStandardMaterial color="#b98b62" />
        </mesh>

        {Object.keys(PRODUCTS).map((id) => (
          <Product
            key={id} id={id} color={colors[id]} screen={screens[id]}
            lamp={lamp} laptopOpen={laptopOpen} finish={finish} night={night} onSelect={select}
          />
        ))}

        <ContactShadows position={[0, 0, 0]} opacity={0.4} blur={2.5} resolution={low ? 128 : 256} />
        <CameraControls ref={controls} maxPolarAngle={Math.PI / 2.1} minDistance={1} maxDistance={14} />
      </Canvas>

      <button
        onClick={() => setNight((n) => !n)}
        style={{ position: "absolute", top: 16, left: 16, padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}
      >
        {night ? "☀️ Gündüz" : "🌙 Gece"}
      </button>

      <div style={{ position: "absolute", top: 64, left: 16, display: "flex", gap: 8 }}>
        {["#e8dccb", "#cfe3d4", "#d9cfe8", "#f2c9c0"].map((c) => (
          <button
            key={c}
            onClick={() => setWall(c)}
            aria-label={`Duvar rengi ${c}`}
            style={{
              width: 28, height: 28, borderRadius: "50%", background: c, cursor: "pointer",
              border: wall === c ? "3px solid #333" : "2px solid #ddd",
            }}
          />
        ))}
      </div>

      {selected && (
        <Panel
          id={selected} colors={colors} screens={screens} finish={finish} setFinish={setFinish}
          setColor={(id, c) => setColors((p) => ({ ...p, [id]: c }))}
          setScreen={(id, c) => setScreens((p) => ({ ...p, [id]: c }))}
          onBack={() => select(null)}
          lamp={lamp} setLamp={setLamp}
          laptopOpen={laptopOpen} setLaptopOpen={setLaptopOpen}
        />
      )}
    </div>
  );
}