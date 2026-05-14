import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
     @property({
            type: Prefab,
        })
        // Pipe prefab used to create new obstacle nodes.
        public pipesPrefab: Prefab = null;
    
        @property({
            type: Node,
            tooltip: 'Container for Pipe Nodes'
        })
        // Parent node that holds active pipe instances in scene.
        public pipePoolHome: Node = null;
    
        // Reusable node pool for inactive pipe instances.
        public pool = new NodePool;
        // Last created or fetched pipe node.
        public createdPipe: Node = null;
    
        start() {
    
        }
    
        update(deltaTime: number) {
            
        }
    
        /**
         * Builds initial pipe nodes for object pool.
         * @returns First pipe is added to scene, others are stored in pool.
         */
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
    
        /**
         * Gets one pipe node from pool (or creates new one).
         * @returns One pipe node is added to `pipePoolHome`.
         */
        addPool() {
            if(this.pool.size() > 0) {
                this.createdPipe = this.pool.get(); // Get the last created Node in NodePool
            } else {
                this.createdPipe = instantiate(this.pipesPrefab);
            }

            this.pipePoolHome.addChild(this.createdPipe);
        }
    
        /**
         * Clears all pipes and rebuilds the pool.
         * @returns Pipe system is reset for a new round.
         */
        resetPool() {
            this.pipePoolHome.removeAllChildren();
            this.pool.clear();
            this.initPool();
        }
}
