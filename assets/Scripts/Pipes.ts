import { _decorator, Component, Node, Vec3, screen, find, UITransform, randomRange, randomRangeInt} from 'cc';
const { ccclass, property } = _decorator;

import { GameManager } from './GameManager';

const VEC3_LEFT = Object.freeze(new Vec3(-1, 0, 0));

@ccclass('Pipes')
export class Pipes extends Component {

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

    public game;

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
        this.game = GameManager.instance;
        if (this.game === null){
            console.log("GameManager is NULL.");
        }

         
        this.pipSpeed = this.game.pipSpeed;
        this.bottomPipeWidth = this.bottomPipe.getComponent(UITransform).contentSize.width;
        //this.pipSpeed = this.gameManager.pipSpeed;
        
        
    }


    start() {
        this.initPosition();
        this.isPassed = false;
        
    }

    update(deltaTime: number) {

        this.calculateMovement(deltaTime);

        if(this.isPassed == false && this.bottomPipe.position.x <= 0){
            this.isPassed = true;
            this.game.passPipe(); // Add score method in GameManager
            //this.gameManager.passPipe(); // Add score method in GameManager
            
        }

        if(this.bottomPipe.position.x < (0 - this.scene.width)){
            this.game.createPipe();
            //this.gameManager.createPipe();
            this.destroy();
        }
        
    }

    initPosition() {
        this.tempLocationUp.x = (this.scene.width + this.bottomPipeWidth);
        this.tempLocationDown.x = (this.scene.width);

        let gap: number = this.randomGapHeight();
       
        this.tempLocationUp.y = Math.round(960 / 2) + gap;
        this.tempLocationDown.y = 0 - Math.round(960 / 2) - gap;
        

        this.topPipe.setPosition(this.tempLocationUp);
        this.bottomPipe.setPosition(this.tempLocationDown);
    }

    calculateMovement(deltaTime: number) {
        this.tempSpeed = this.pipSpeed * deltaTime;

        this.topPipe.translate(Vec3.RIGHT);
        this.bottomPipe.translate(VEC3_LEFT);
    }

    randomGapHeight(): number {
        let gap = randomRangeInt(100, 150);
        return gap;
    }

}


