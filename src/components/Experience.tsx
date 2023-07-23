import { Box, Sphere, OrbitControls, Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// import { AmbientLight, DirectionalLight } from "three";
import { CuboidCollider, RigidBody, RapierRigidBody, quat} from "@react-three/rapier";
import React from "react";
import {useRef, useState} from "react";
import * as THREE from 'three';

export const Experience = () => {
const [hover, setHover] = useState(false);

const ballman=useRef<RapierRigidBody>(null) ;
const jump = () => {
  ballman.current?.applyImpulse({x: 0,y: 3,z: 0}, true)
}

const hoop=useRef<RapierRigidBody>(null) ;

useFrame((_state, delta) => {
  if (hoop.current) {
      const curRotation = quat(hoop.current.rotation());
      const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0,1,0),
        delta * 1.5
      );
      curRotation.multiply(incrementRotation);
      hoop.current.setNextKinematicRotation(curRotation)
  }
}
)

  return (
    <>
     <ambientLight intensity={0.5}/>
    <directionalLight position={[10,-10,0]} intensity={0.4}/>
      <OrbitControls />
      
      <RigidBody colliders="trimesh" position={[0,0,0]} type='kinematicPosition' ref={hoop}>
        <Box args={[3,0.5,0.5]} position={[1.5,.5,0]}>
          <meshStandardMaterial color='hotpink'/>
        </Box>

        <Torus position={[3.5,1,0]} rotation={[1.5,0,0]} scale={0.9} >
          <meshStandardMaterial color='royalblue' />
        </Torus>
      </RigidBody>

      <RigidBody colliders='ball' ref={ballman}>
        <Sphere args={[.5]} position={[3.5,5,0]}  
        onPointerEnter={() => setHover(true)} 
        onPointerLeave={() => setHover(false)}
        onClick={jump}
        >
        <meshStandardMaterial color={hover ? 'magenta' : "orange"} />
        </Sphere>
      </RigidBody>

      <RigidBody type='fixed'>
        <Box position={[0,0,0]}  args={[10,1,10]}>
          <meshStandardMaterial color='springgreen' />
        </Box>
      </RigidBody>
    </>
  );
};
