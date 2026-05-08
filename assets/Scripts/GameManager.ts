import { _decorator, CCInteger, Component, director, EventKeyboard, Input, input, KeyCode } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
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
        director.pause;

    }

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    startGame() {
        this.results.hideResults();
        director.resume();

    }

    update(deltaTime: number) {
        
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


