import { _decorator, Component, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    @property({
            type: [AudioClip],
        })
        public clips: AudioClip[] = [];
    
        @property({
            type: AudioSource,
        })
        public audioSource: AudioSource = null!;
    
    
        start() {
    
        }
    
        update(deltaTime: number) {
            
        }
    
        onAudioQueue(index: number) {
            let audioClip: AudioClip = this.clips[index];
            
            this.audioSource.playOneShot(audioClip);
        }
}


