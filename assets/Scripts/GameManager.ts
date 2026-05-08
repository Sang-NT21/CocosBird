import { _decorator, CCInteger, Component, director, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

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
    

    onLoad() {
        this.initListener();
        this.results.resetScore();
        director.pause();

    }

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        // Make sure thie size of this node is cover fullscreen to capture touch
        this.node.on(Node.EventType.TOUCH_START, () => {
            this.bird.flyBird();
        });
    }

    startGame() {
        this.results.hideResults();
        director.resume();

    }

    update(deltaTime: number) {
        this.bird.flyBird();
        
    }

    // This is for TESTING
    // DELETE
    onKeyDown(event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.gameOver();
                break;
            case KeyCode.KEY_P:
                this.results.addScore();
                break;
            case KeyCode.KEY_Q:
                this.resetGame();
                this.bird.resetBird();
                break;
        }
    }

    gameOver() {
        this.results.showResults();
        director.pause();

    }

    resetGame() {
        this.results.resetScore();
        this.startGame();
    }
}


