import { _decorator, CCFloat, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({
        type: CCFloat,
        tooltip: 'How high can player bird flies'
    })
    public jumpHeight: number = 3.5;

    @property({
        type: CCFloat,
        tooltip: 'How long can player bird flies'
    })
    public jumpDuration: number =  3.5;

    public birdAnimation: Animation;
    

    start() {

    }

    update(deltaTime: number) {
        
    }
}


