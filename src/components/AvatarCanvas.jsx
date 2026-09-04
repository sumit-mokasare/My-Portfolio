import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Avatar from "./Avatar";

export default function AvatarCanvas({ onLoaded }) {
  return (
    <Canvas
      className="w-full h-full "
      style={{ background: "transparent" }}
      gl={{ alpha: true }}
      camera={{ position: [0, 1, 3], fov: 45 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={2} />

      <Avatar position={[0, -6.3, 0]} scale={3.8} onLoaded={onLoaded} />

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
