import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Loader } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/assets/scene.gltf");

  useEffect(() => {
    console.log("Model loaded:", scene);
  }, [scene]);

  return <primitive object={scene} />;
}

const ThreeDModel = () => {
  return (
    <div style={{ height: "140vh", width: "100%" }} className="my-auto">
      <Canvas
        camera={{
          position: [150, 140, 35],
          fov: 70,
          near: 10,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <Model position={[5, 2, 10]} />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          target={[0, 0, 0]}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
      <Loader />
    </div>
  );
};

export default ThreeDModel;
