# CocosBird

<p align="center">
  <img src="https://img.shields.io/badge/Cocos%20Creator-3.6.3-0ea5e9?style=for-the-badge" alt="Cocos Creator 3.6.3" />
  <img src="https://img.shields.io/badge/TypeScript-Gameplay%20Code-3178c6?style=for-the-badge" alt="TypeScript Gameplay Code" />
  <img src="https://img.shields.io/badge/Genre-2D%20Arcade-f59e0b?style=for-the-badge" alt="2D Arcade" />
  <img src="https://img.shields.io/badge/Status-Portfolio%20Project-22c55e?style=for-the-badge" alt="Portfolio Project" />
</p>

<p align="center">
  <b>A small <code>Flappy Bird inspired</code> game built with <code>Cocos Creator</code> and <code>TypeScript</code>.</b><br/>
  Focused on <b>gameplay scripting</b>, <b>UI flow</b>, <b>audio control</b>, and <b>prefab-based obstacle spawning</b>.
</p>

## Preview

<p align="center">
  <img src="screenshots/Desktop%20Screenshot%202026.05.12%20-%2016.18.05.92.png" width="260" alt="Gameplay screenshot 1" />
  <img src="screenshots/Desktop%20Screenshot%202026.05.12%20-%2016.18.04.32.png" width="260" alt="Gameplay screenshot 2" />
</p>

## What This Project Is

**CocosBird** is a simple mobile-style arcade game where the player taps to make the bird fly through moving pipes and earn points.

### <b>Key Focus</b>
- **Gameplay Loop**: start -> tap to fly -> avoid collision -> score -> game over -> restart
- **Reusable Systems**: prefab-driven pipe spawning and pooling
- **Game UI**: score, high score, hint text, retry button, settings backdrop
- **Audio**: flap, point, hit, die, and background music toggle

## Highlights

- **Engine**: `Cocos Creator 3.6.3`
- **Language**: `TypeScript`
- **Pattern**: `GameManager` as the main gameplay coordinator
- **Objects**: `Bird`, `Ground`, `Pipes`, `PipePool`, `UIManager`, `AudioManager`
- **Input**: touch-based control
- **Scene Setup**: Cocos Editor property binding with prefabs and scene references

## Gameplay Features

- **Tap to Fly**
- **Moving Pipe Obstacles**
- **Score Counter**
- **High Score Display**
- **Restart Flow**
- **Background Music Toggle**
- **Scrolling Ground**
- **Collision Detection**

## Tech Stack

| Area | Used |
|---|---|
| **Engine** | `Cocos Creator 3.6.3` |
| **Language** | `TypeScript` |
| **Physics** | `2D Collider / RigidBody` |
| **UI** | `Cocos UI Components` |
| **Audio** | `AudioSource`, `AudioClip` |
| **Assets** | sprites, prefab, scene, animation, sound effects |

## Project Structure

```text
assets/
|- _Scenes/        Main scene
|- Prefabs/        Pipe prefab
|- Scripts/
|  |- GameManager.ts
|  |- Bird.ts
|  |- Ground.ts
|  |- Pipes.ts
|  |- PipePool.ts
|  |- UI/UIManager.ts
|  |- Audio/
|     |- AudioManager.ts
|     |- BackgroundAudio.ts
|- Resources/      Images, fonts, UI assets
|- Audio/          Sound effects and background music
```

## Main Systems

### `GameManager`
**Controls the full game flow**:
- game start
- reset
- score update trigger
- collision/game over
- communication between gameplay and UI

### `Bird`
**Handles player movement**:
- tap input response
- upward movement tween
- animation trigger
- collision state

### `Pipes` + `PipePool`
**Handles obstacle generation**:
- random pipe gap position
- left movement
- score check when passing pipes
- prefab spawn / reuse logic

### `UIManager`
**Handles player-facing UI**:
- live score
- high score text
- hint visibility
- retry button
- settings backdrop

### `AudioManager` + `BackgroundAudio`
**Handles sound and music**:
- one-shot SFX
- background music playback
- toggle on/off flow

## Why I Built This

This project was built as a **practice project for junior/fresher Cocos game developer roles**.

It helped me practice:
- **TypeScript scripting inside Cocos Creator**
- **scene and prefab workflow**
- **component-based architecture**
- **basic game state management**
- **UI and audio integration**

## Run This Project

1. Open the project in **Cocos Creator `3.6.3`**
2. Load the main scene in `assets/_Scenes/scene.scene`
3. Press **Preview** or **Run**

## Portfolio Note

If you are reviewing this project, the main code is inside:

- [`assets/Scripts/GameManager.ts`](assets/Scripts/GameManager.ts)
- [`assets/Scripts/Bird.ts`](assets/Scripts/Bird.ts)
- [`assets/Scripts/Pipes.ts`](assets/Scripts/Pipes.ts)
- [`assets/Scripts/PipePool.ts`](assets/Scripts/PipePool.ts)
- [`assets/Scripts/UI/UIManager.ts`](assets/Scripts/UI/UIManager.ts)

---

<p align="center">
  <b>Portfolio project by a fresher game developer focused on <code>Cocos Creator</code> gameplay programming.</b>
</p>
