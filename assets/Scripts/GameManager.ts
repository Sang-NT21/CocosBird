import { _decorator, CCInteger, Component, Node } from 'cc';
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

    }

    initListener() {

    }

    startGame() {
        this.results.hideResults();

    }

    update(deltaTime: number) {
        
    }
}


