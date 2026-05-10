import { _decorator, CCInteger, Component, director, EventKeyboard, Input, input,
     KeyCode, Node, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    public static instance: GameManager = null;

    @property({
        type: Ground,
        tooltip: 'this is ground'
    })
    public ground: Ground;

    @property({
        type: Results,
        tooltip: 'Results UI Node'
    })
    public results: Results;

    @property({
        type: Bird,
    })
    public bird: Bird;
    

    @property({
        type: CCInteger,
    })
    public speed: number = 300;

    @property({
        type: CCInteger,
    })
    public pipSpeed: number = 200;

    @property({
        type: PipePool,
    })
    public pipePool: PipePool;

    public isOver: boolean = false;

    onLoad() {
        // Singleton
        if (GameManager.instance == null) {
            GameManager.instance = this;
        } else {
            // Destroy if duplicated
            this.destroy();
            return;
        }

        this.initListener();
        this.results.resetScore();
        this.isOver = true;
        director.pause();

    }

    initListener() {
        //input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        // Make sure thie size of this node is cover fullscreen to capture touch
        this.node.on(Node.EventType.TOUCH_START, () => {

            if (this.isOver === true) {
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            } else {
                this.bird.flyBird();
            }
            
        });
    }

    startGame() {
        this.results.hideResults();
        director.resume();

    }

    update(deltaTime: number) {
        if (this.isOver == false) {
            this.birdStruck();
        }
        
    }

    // This is for TESTING
    // DELETE
    // onKeyDown(event: EventKeyboard) {
    //     switch(event.keyCode) {
    //         case KeyCode.KEY_A:
    //             this.gameOver();
    //             break;
    //         case KeyCode.KEY_P:
    //             this.results.addScore();
    //             break;
    //         case KeyCode.KEY_Q:
    //             this.resetGame();
    //             this.bird.resetBird();
    //             break;
    //     }
    // }

    gameOver() {
        this.isOver = true;
        this.results.showResults();
        director.pause();

    }

    resetGame() {
        this.results.resetScore();
        this.pipePool.resetPool();
        this.isOver = false;
        this.startGame();
    }

    passPipe() {
        this.results.addScore();
    }

    createPipe() {
        this.pipePool.addPool();
    }

    onContact(){
        let collider = this.bird.getComponent(Collider2D);

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(self: Collider2D, orther: Collider2D, contact: IPhysics2DContact | null) {
        this.bird.hitSomething = true;
    }

    birdStruck() {
        this.onContact();
        
        if (this.bird.hitSomething === true) {
            this.gameOver();
        }
    }
}


