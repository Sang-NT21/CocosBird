import { _decorator, Component, Node, Vec3, screen, find, UITransform, randomRange, randomRangeInt} from 'cc';
const { ccclass, property } = _decorator;

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

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

    public scene = screen.windowSize;

    
    //public game;
    public pipSpeed: number;
    public tempSpeed: number;

    isPassed : boolean = false;

    onLoad() {
        this.game = find('GameManager').getComponent('GameManager');
        this.pipSpeed = this.game.pipSpeed;
        //this.pipSpeed = this.gameManager.pipSpeed;
        this.initPosition();
        this.isPassed = false;
    }


    start() {

    }

    update(deltaTime: number) {

        this.calculateMovement(deltaTime);

        if(this.isPassed == false && this.topPipe.position.x <= 0){
            this.isPassed = true;
            this.game.passPipe(); // Add score method in GameManager
            //this.gameManager.passPipe(); // Add score method in GameManager
        }

        if(this.topPipe.position.x < (0 - this.scene.width)){
            this.game.createPipe();
            //this.gameManager.createPipe();
            
            this.node.destroy();
        }
        
    }

    initPosition() {

        this.tempLocationUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);
        this.tempLocationDown.x = (this.bottomPipe.getComponent(UITransform).width + this.scene.width);

        let gap = random(90, 100);
        let topHeight = random(0, 450);

        this.tempLocationUp.y = topHeight;
        this.tempLocationDown.y = topHeight - (gap * 10);

        this.topPipe.setPosition(this.tempLocationUp);
        this.bottomPipe.setPosition(this.tempLocationDown);

    }

    calculateMovement(deltaTime: number) {
        this.tempSpeed = this.pipSpeed * deltaTime;

        this.tempLocationUp = this.bottomPipe.position;
        this.tempLocationDown = this.topPipe.position;
        
        this.tempLocationUp.x -= this.tempSpeed;
        this.tempLocationDown.x -= this.tempSpeed;

        this.topPipe.setPosition(this.tempLocationUp);
        this.bottomPipe.setPosition(this.tempLocationDown);

    }

}


