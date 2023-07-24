import { Box, Sphere, OrbitControls, Torus, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// import { AmbientLight, DirectionalLight } from "three";
import { CuboidCollider, RigidBody, RapierRigidBody, quat} from "@react-three/rapier";
import React from "react";
import {useRef, useState} from "react";
import * as THREE from 'three';
import { Controls } from "../App";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

export const Experience = () => {
const [hover, setHover] = useState(false);

const ballman=useRef<RapierRigidBody>(null) ;
const jump = () => {
  if (isOnFloor.current) { 
  ballman.current?.applyImpulse({x: 0,y: 3,z: 0}, true);
  isOnFloor.current = false;
}};

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );

  const handleMovement = () => {
    if (ballman.current) {
    if (!isOnFloor.current) {
      return;
    }
    if (rightPressed) {
      ballman.current.applyImpulse({ x: 0.1, y: 0, z: 0 }, true);
    }
    if (leftPressed) {
      ballman.current.applyImpulse({ x: -0.1, y: 0, z: 0 }, true);
    }

    if (forwardPressed) {
      ballman.current.applyImpulse({ x: 0, y: 0, z: -0.1 }, true);
    }
    if (backPressed) {
      ballman.current.applyImpulse({ x: 0, y: 0, z: 0.1 }, true);
    }
  }
  };

const hoop=useRef<RapierRigidBody>(null) ;

useFrame((_state, delta) => {
  if (jumpPressed) {
    jump();
  }
  handleMovement();
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

const isOnFloor = useRef(false)

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

      <RigidBody colliders='ball' ref={ballman} 
      onCollisionEnter={({other}) => {
        if (other.rigidBodyObject) {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor.current = true;
          }
      }
    }}
    onCollisionExit={({other}) => {
      if (other.rigidBodyObject) {
        if (other.rigidBodyObject.name === "floor") {
         isOnFloor.current = false;
        }
      }
    }}
    >
        <Sphere args={[.5]} position={[3.5,5,0]}  
        onPointerEnter={() => setHover(true)} 
        onPointerLeave={() => setHover(false)}
        onClick={jump}
        >
        <meshStandardMaterial color={hover ? 'magenta' : "orange"} />
        </Sphere>
      </RigidBody>

      <RigidBody type='fixed' name="floor">
        <Box position={[0,0,0]}  args={[10,1,10]}>
          <meshStandardMaterial color='springgreen' />
        </Box>
      </RigidBody>
    </>
  );
};
