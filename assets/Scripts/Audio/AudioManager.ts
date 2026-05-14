import { _decorator, Component, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    @property({
            type: [AudioClip],
        })
        // List of sound clips (flap, point, hit, die...).
        public clips: AudioClip[] = [];
    
        @property({
            type: AudioSource,
        })
        // AudioSource component used to play one-shot sound effects.
        public audioSource: AudioSource = null!;
    
    
        start() {
    
        }
    
        update(deltaTime: number) {
            
        }
    
        /**
         * Plays one sound effect from clips list.
         * @param index Index of sound clip in `clips`.
         * @returns One-shot sound is played.
         */
        onAudioQueue(index: number) {
            let audioClip: AudioClip = this.clips[index];
            
            this.audioSource.playOneShot(audioClip);
        }
}


