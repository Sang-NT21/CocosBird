import { _decorator, Button, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {

    @property({
        type: Label,
    })
    public scoreLabel: Label;

    @property({
        type: Label,
    })
    public highScoreLabel: Label;

    @property({
        type: Button,
        visible: true,
    })
    private _tryAgainButton: Button;

    @property({
        type: Label,
    })
    public hintLabel: Label;

    @property({
        type: Node,
        tooltip: 'Backdrop for Game Settings UI',
        visible: true,
    })
    private _settingsBackdrop: Node;

    maxScore: number = 0;
    currentScore: number = 0;



    start() {
        this.closeSetting();
        this.hideResults();

    }

    update(deltaTime: number) {
        
    }

    updateScore(score: number) {
        this.currentScore = score;
        this.scoreLabel.string = this.currentScore.toString();
    }

    resetScore() {
        this.updateScore(0);
    }

    addScore() {
        this.updateScore(this.currentScore + 1);
    }

    showResults() {
        this.maxScore = Math.max(this.currentScore, this.maxScore);
        this.highScoreLabel.string = "High Score: " + this.maxScore.toString();
        this.highScoreLabel.node.active = true;
        this._tryAgainButton.node.active = true;
    }

    hideResults() {
        this.highScoreLabel.node.active = false;
        this._tryAgainButton.node.active = false;
    }

    hideHint() {
        if (this.hintLabel){
            this.hintLabel.node.active = false;
        } 
    }

    showSettings() {
        if(this._settingsBackdrop){
            this._settingsBackdrop.active = true;
        }
    }

    closeSetting() {
        if(this._settingsBackdrop){
            this._settingsBackdrop.active = false;
        }
    }
}


