import { useGLTF, useAnimations } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";

import * as THREE from "three";

export default function Avatar({ onLoaded, ...props }) {
  const group = useRef();
  const neckRef = useRef(null);
  const spineRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const [isMouseActive, setIsMouseActive] = useState(true);

  const { scene, animations } = useGLTF("/avatar.glb");
  const { actions } = useAnimations(animations, group);
  const { gl } = useThree();

  useEffect(() => {
    scene.traverse((object) => {
      // console.log(object);
      if (object.isBone && object.name === "Head") neckRef.current = object;
      if (object.isBone && object.name === "Hips") spineRef.current = object;
      if (object.isBone && object.name === "LeftEye") leftEyeRef.current = object;
      if (object.isBone && object.name === "RightEye") rightEyeRef.current = object;
    });

    // const animationNames = Object.keys(actions);
    // if (animationNames.length > 0) {
    //   // actions[animationNames[3]]?.reset().fadeIn(0.5).play();
    // }
    onLoaded?.();
  }, [actions, scene, onLoaded]);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleMouseLeave = () => setIsMouseActive(false);
    const handleMouseEnter = () => setIsMouseActive(true);

    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    window.addEventListener("blur", handleMouseLeave);
    window.addEventListener("focus", handleMouseEnter);

    return () => {
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleMouseLeave);
      window.removeEventListener("focus", handleMouseEnter);
    };

    // canvas.documentElement.addEventListener("mouseleave", handleMouseLeave);
    // canvas.documentElement.addEventListener("mouseenter", handleMouseEnter);

    // return () => {
    //   canvas.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    //   canvas.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    //   // window.removeEventListener("blur", handleMouseLeave);
    //   // window.removeEventListener("focus", handleMouseEnter);
    // };
  }, [gl]);

  useFrame((state) => {
    const { pointer } = state;

    if (!neckRef.current) return;

    // 👇 yeh line missing thi — target values ab isMouseActive par depend karengi
    const targetNeckY = isMouseActive ? pointer.x * 0.5 : 0;
    const targetNeckX = isMouseActive ? -pointer.y * 0.6 : 0;

    if (neckRef.current) {
      neckRef.current.rotation.y = THREE.MathUtils.lerp(neckRef.current.rotation.y, targetNeckY, 0.1);
      neckRef.current.rotation.x = THREE.MathUtils.lerp(neckRef.current.rotation.x, targetNeckX, 0.1);
    }

    if (spineRef.current) {
      const targetSpineY = isMouseActive ? pointer.x * 0.15 : 0;
      const targetSpineX = isMouseActive ? -pointer.y * 0.08 : 0;

      spineRef.current.rotation.y = THREE.MathUtils.lerp(spineRef.current.rotation.y, targetSpineY, 0.08);
      spineRef.current.rotation.x = THREE.MathUtils.lerp(spineRef.current.rotation.x, targetSpineX, 0.08);
    }

    const targetEyeY = isMouseActive ? pointer.x * 0.15 : 0;
    const targetEyeX = isMouseActive ? -pointer.y * 0.2 : 0;

    if (leftEyeRef.current) {
      leftEyeRef.current.rotation.y = THREE.MathUtils.lerp(leftEyeRef.current.rotation.y, targetEyeY, 0.15);
      leftEyeRef.current.rotation.x = THREE.MathUtils.lerp(leftEyeRef.current.rotation.x, targetEyeX, 0.15);
    }

    if (rightEyeRef.current) {
      rightEyeRef.current.rotation.y = THREE.MathUtils.lerp(rightEyeRef.current.rotation.y, targetEyeY, 0.15);
      rightEyeRef.current.rotation.x = THREE.MathUtils.lerp(rightEyeRef.current.rotation.x, targetEyeX, 0.15);
    }
  });

  return <primitive ref={group} object={scene} {...props} />;
}

useGLTF.preload("/avatar.glb");
