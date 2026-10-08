import { lazy, Suspense, useState } from "react";

const Scene = lazy(() => import("./Scene"));

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const lowPower =
  (navigator.hardwareConcurrency ?? 8) <= 2 ||
  (navigator.deviceMemory ?? 8) <= 2 ||
  navigator.connection?.saveData === true;

const center = { minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24, fontFamily: "system-ui" };

export default function App() {
  const [force3d, setForce3d] = useState(false);

  if ((reduced || lowPower) && !force3d) {
    return (
      <div style={center}>
        <div>
          <img src="/preview.jpg" alt="Masa üstü kurulumu: lamba, laptop, telefon, kulaklık ve kedi" style={{ maxWidth: "min(720px, 100%)", borderRadius: 12 }} />
          <p>Hareket azaltma veya düşük güç modu algılandı, bu yüzden 3D sahne yüklenmedi.</p>
          <button onClick={() => setForce3d(true)}>Yine de 3D sahneyi yükle</button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div style={center}>Sahne yükleniyor…</div>}>
      <Scene />
    </Suspense>
  );
}