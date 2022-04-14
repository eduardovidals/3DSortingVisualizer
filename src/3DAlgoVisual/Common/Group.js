import React, {useRef} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";

function Group(props) {
    const {children} = props;
    const ref = useRef();
    useFrame((state, delta) => {
    });
    return (
        <group ref={ref}>
            {children}
        </group>
    )
}

export default Group;
