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
            tooltip: 'Container for Pipe Nodes'
        })
        public pipePoolHome: Node = null;
    
        public pool = new NodePool;
        public createdPipe: Node = null;
    
        start() {
    
        }
    
        update(deltaTime: number) {
            
        }
    
        initPool() {
            let initCount: number = 3;
            for (let i = 0; i < initCount; i++){
                this.createdPipe = instantiate(this.pipesPrefab);

                if (i == 0){
                    this.pipePoolHome.addChild(this.createdPipe);
                } else {
                    this.pool.put(this.createdPipe);
                }
            }
    
        }
    
        addPool() {
            if(this.pool.size() > 0) {
                this.createdPipe = this.pool.get(); // Get the last created Node in Pool
            } else {
                this.createdPipe = instantiate(this.pipesPrefab);
            }

            this.pipePoolHome.addChild(this.createdPipe);
        }
    
        resetPool() {
            this.pipePoolHome.removeAllChildren();
            this.pool.clear();
            this.initPool();
        }
}


