import {MeshProps, useFrame} from "@react-three/fiber";
import React, {useEffect, useMemo, useRef, useState} from "react";
import * as THREE from "three";

function Bar(props) {
  const {dimensions, position, meshRef, color} = props;

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={1}
      castShadow={true}
    >
      <boxGeometry args={dimensions}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

export default Bar;
