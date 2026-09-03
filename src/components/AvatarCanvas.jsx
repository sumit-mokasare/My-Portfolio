import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Avatar from "./Avatar";

// Fills whatever parent container it's placed in — no fixed/100vw sizing
// so it can be dropped inside the Hero's background layer, a card, a
// modal, wherever. Parent must have a defined height (e.g. inset-0 on a
// relative wrapper) for this to render correctly.

export default function AvatarCanvas() {
  return (
    <Canvas
      className="w-full h-full "
      style={{ background: "transparent" }}
      gl={{ alpha: true }}
      camera={{ position: [0, 1, 3], fov: 45 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={2} />

      <Avatar position={[0, -6.3, 0]} scale={3.8} />

      <Environment preset="city" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        minAzimuthAngle={0}
        maxAzimuthAngle={0}
        minPolarAngle={Math.PI / 2.0}
        maxPolarAngle={Math.PI / 1.9}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
}
