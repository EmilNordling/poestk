import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { MapControls } from '@react-three/drei/MapControls';
import { useService } from 'one-atom';
import { PassivesTreeCoreService } from './_skill_tree_core_service';

export namespace SkillTreeScene {
  const Box: FC<any> = function Box(props) {
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

  export const h: FC = function Scene() {
    const passivesTreeCoreService = useService(PassivesTreeCoreService);

    useEffect(() => {
      passivesTreeCoreService.skillTreeDataService.load();
    }, []);

    return (
      <Canvas
        concurrent
        orthographic
        camera={{ position: [0, 0, 50], zoom: 10, up: [0, 0, 1], far: 10000 }}
        resize={{ scroll: false }}
        invalidateFrameloop={true}
      >
        <ambientLight />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Box position={[2.4, 0, 0]} />
        <MapControls enableDamping={false} enableRotate={false} />
      </Canvas>
    );
  };
}
