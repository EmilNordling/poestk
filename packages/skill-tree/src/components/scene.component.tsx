import React, { Fragment, useRef, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { MapControls } from '@react-three/drei/MapControls';
import { PassivesTreeService } from '../modules/passive_tree_service/mod';
import { FlowState, use_application_state } from '@kira/application-state';

export namespace Scene {
  const Box: React.FC<any> = function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    );
  };

  export const h: React.FC<{ passiveTree: PassivesTreeService }> = function Scene({ passiveTree }) {
    const [state, flow] = use_application_state(passiveTree.state);
    console.log(state);

    return (
      <Canvas
        orthographic
        camera={{ position: [0, 0, 50], zoom: 10, up: [0, 0, 1], far: 10000 }}
        resize={{ scroll: false }}
        invalidateFrameloop={true}
      >
        <ambientLight />

        {flow === FlowState.ACCESSIBLE ? (
          <Fragment>
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <Box position={[2.4, 0, 0]} />
          </Fragment>
        ) : null}
        <MapControls enableDamping={false} />
      </Canvas>
    );
  };
}
