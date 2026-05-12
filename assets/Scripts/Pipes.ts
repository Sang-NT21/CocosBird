import { _decorator, Component, Node, Vec3, screen, find, UITransform, randomRange, randomRangeInt, CCInteger} from 'cc';
const { ccclass, property } = _decorator;

import { GameManager } from './GameManager';

const VEC3_LEFT = Object.freeze(new Vec3(-1, 0, 0));

@ccclass('Pipes')
export class Pipes extends Component {

    @property({
        type: CCInteger,
        tooltip: 'Lowest pipes gap position.y',
        visible: true,
    })
    private _lowestGap: number = 0;

     @property({
        type: CCInteger,
        tooltip: 'Highest pipes gap position.y',
        visible: true,
    })
    private _highestGap: number = 300;

    @property({
        type: Node,
        tooltip: 'Top Pipe',
    })
    public topPipe: Node = null;

    @property({
        type: Node,
        tooltip: 'Bottom Pipe',
    })
    public bottomPipe: Node = null;

    public gameManager;

    public tempLocationUp: Vec3 = new Vec3(0, 0, 0);
    public tempLocationDown: Vec3 = new Vec3(0, 0, 0);

    public bottomPipeWidth: number = 52;

    public scene = screen.windowSize;

    

    
    //public game;
    public pipSpeed: number;
    public tempSpeed: number;

    isPassed : boolean = false;

    onLoad() {
        //this.game = find('GameManager').getComponent('GameManager');
        this.gameManager = GameManager.instance;
        if (this.gameManager == null){
            console.log("GameManager is NULL.");
        }

        if(this.gameManager){
            this.pipSpeed = this.gameManager.pipSpeed;
        }

        this.bottomPipeWidth = this.bottomPipe.getComponent(UITransform).contentSize.width;
        //this.pipSpeed = this.gameManager.pipSpeed;
        
        
    }


    start() {
        this.initPosition();
        this.isPassed = false;
        
    }

    update(deltaTime: number) {

        this.calculateMovement(deltaTime);

        if(this.isPassed === false && this.bottomPipe.position.x <= 0){
            this.isPassed = true;
            if(this.gameManager){
                this.gameManager.passPipe(); // Add score method in GameManager
            }
            
        }

        // Destroy pipes after they move off screen
        if(this.bottomPipe.position.x < (0 - this.scene.width * (3/4))){
            
            if (this.gameManager) {
                this.gameManager.createPipe();
            }

            this.node.destroy();
        }
        
    }

    initPosition() {
        this.tempLocationUp.x = (this.scene.width * (3/5) + this.bottomPipeWidth);
        this.tempLocationDown.x = (this.scene.width * (3/5));

        let gap: number = this.randomGapHeight(0, 300);
        this.tempLocationDown.y = this.bottomPipe.position.y + gap;
        this.tempLocationUp.y = this.topPipe.position.y + gap;
        

        this.topPipe.setPosition(this.tempLocationUp);
        this.bottomPipe.setPosition(this.tempLocationDown);
    }

    calculateMovement(deltaTime: number) {

        this.tempLocationUp.x -= this.pipSpeed * deltaTime;
        this.tempLocationDown.x -= this.pipSpeed * deltaTime;

        this.topPipe.setPosition(this.tempLocationUp);
        this.bottomPipe.setPosition(this.tempLocationDown);
    }

    randomGapHeight(lowestGap: number, highestHap: number): number {
        let gap = randomRangeInt(lowestGap, highestHap);
        return gap;
    }

}


