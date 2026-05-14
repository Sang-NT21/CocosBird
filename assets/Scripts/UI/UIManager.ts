import { _decorator, Component, Node, Label, Button, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property({
            type: Label,
        })
        // Label that shows current score while playing.
        public scoreLabel: Label;
    
        @property({
            type: Label,
        })
        // Label that shows best score on result screen.
        public highScoreLabel: Label;
    
        @property({
            type: Button,
            visible: true,
        })
        // Restart button shown after game over.
        private _tryAgainButton: Button;
    
        @property({
            type: Label,
        })
        // Hint text shown before starting game.
        public hintLabel: Label;
    
        @property({
            type: Node,
            tooltip: 'Backdrop for Game Settings UI',
            visible: true,
        })
        // Backdrop node for settings popup.
        private _settingsBackdrop: Node;
    
        // Highest score reached in current app session.
        maxScore: number = 0;
        // Current score in active round.
        currentScore: number = 0;
    
    
    
        start() {
            this.closeSetting();
            this.hideResults();
    
        }
    
        update(deltaTime: number) {
            
        }
    
        /**
         * Updates current score and score label text.
         * @param score New score value.
         * @returns Score number on UI is refreshed.
         */
        updateScore(score: number) {
            this.currentScore = score;
            this.scoreLabel.string = this.currentScore.toString();
        }
    
        /**
         * Sets score back to 0.
         * @returns Score label shows 0.
         */
        resetScore() {
            this.updateScore(0);
        }
    
        /**
         * Adds 1 point to current score.
         * @returns Score label increases by one.
         */
        addScore() {
            this.updateScore(this.currentScore + 1);
        }
    
        /**
         * Shows result UI after game over.
         * @returns High score text and retry button become visible.
         */
        showResults() {
            this.maxScore = Math.max(this.currentScore, this.maxScore);
            this.highScoreLabel.string = "High Score: " + this.maxScore.toString();
            this.highScoreLabel.node.active = true;
            this._tryAgainButton.node.active = true;
        }
    
        /**
         * Hides result UI elements.
         * @returns High score text and retry button are hidden.
         */
        hideResults() {
            this.highScoreLabel.node.active = false;
            this._tryAgainButton.node.active = false;
        }
    
        /**
         * Hides hint text on screen.
         * @returns Hint label node becomes inactive.
         */
        hideHint() {
            if (this.hintLabel){
                this.hintLabel.node.active = false;
            } 
        }
    
        /**
         * Opens settings panel.
         * @returns Game is paused and settings backdrop is shown.
         */
        showSettings() {
            if(this._settingsBackdrop){
                director.pause();
                this._settingsBackdrop.active = true;
            }
        }
    
        /**
         * Closes settings panel.
         * @returns Settings backdrop is hidden and game resumes.
         */
        closeSetting() {
            if(this._settingsBackdrop){
                this._settingsBackdrop.active = false;
                director.resume();
            }
        }
}


