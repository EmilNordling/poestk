import React from 'react';
import { Scene } from './scene.component';
import { use_service } from '@kira/instantiation';
import { PassivesTreeService } from '../modules/passive_tree_service/mod';

export namespace Tree {
  export const h: React.FC = function Tree() {
    console.log('?');
    const passivesTreeService = use_service(PassivesTreeService);

    return <Scene.h passiveTree={passivesTreeService} />;
  };
}
