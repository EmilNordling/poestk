import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { extend, Canvas, useThree } from 'react-three-fiber';
// @ts-ignore
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import { MapControls } from '@react-three/drei/MapControls';
import { useService } from 'one-atom';
import { SkillTreeKit } from '../modules/skill_tree_kit/mod';

extend({ MeshLine, MeshLineMaterial });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLine: any;
      meshLineMaterial: any;
    }
  }
}

const Box: FC<any> = function Scene_Box(props) {
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

const Line: FC = function Scene_Line() {
  const { size } = useThree();

  return (
    <mesh raycast={MeshLineRaycast}>
      <meshLine attach="geometry" position={[0, 1, 0]} />
      <meshLineMaterial
        attach="material"
        depthTest={false}
        lineWidth={10}
        color={'#A2CCB6'}
        transparent
        resolution={new THREE.Vector2(size.width, size.height)}
      />
    </mesh>
  );
};

export const SkillTree: FC = () => {
  const skillTreeKit = useService(SkillTreeKit);

  useEffect(() => {
    skillTreeKit.staticSTParser.retrieveAndParse();
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

      <group>
        <Line />
      </group>

      <MapControls enableDamping={false} enableRotate={false} />
    </Canvas>
  );
};
