import { Canvas } from "@react-three/fiber";
import { BasketballGame } from "./components/BasketballGame";
import { Suspense, useMemo } from "react";
import { Physics  } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import React from "react";


export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
}

function App() {

  const map = useMemo(
    () => [   
    { name: Controls.forward, keys: ["ArrowUp", "keyW"] },
    {name: Controls.back, keys: ["ArrowDown", "keyS"]},
    {name: Controls.left, keys: ["ArrowLeft", "keyA"]},
    {name: Controls.right, keys: ["ArrowRight", "keyD"]},
    {name: Controls.jump, keys: ["Space"]},
    ], []);

 

  return (
    <KeyboardControls map={map}>
    <Canvas shadows camera={{ position: [10,10,10], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Suspense>
        <Physics debug >
          <BasketballGame />
        </Physics>
      </Suspense>
    </Canvas>
    </KeyboardControls>
  );
}

export default App;
