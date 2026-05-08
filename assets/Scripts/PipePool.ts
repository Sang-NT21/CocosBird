import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
     @property({
            type: Prefab,
        })
        public pipesPrefab: Prefab = null;
    
        @property({
            type: Node,
        })
        public pipeContainerHome;
    
        public pool = new NodePool;
    
        start() {
    
        }
    
        update(deltaTime: number) {
            
        }
    
        initPool() {
            let initCount: number = 3;
            for (let i = 0; i < initCount; i++){
                let createPipe = instantiate(this.pipesPrefab);
            }
    
        }
    
        addPool() {
    
        }
    
        resetPool() {
            
        }
}


