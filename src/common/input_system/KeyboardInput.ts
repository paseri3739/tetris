import { InputDevice } from "common/interfaces/InputDevice.js";
import { InputState } from "./InputState.js";

export class KeyboardInput implements InputDevice {
    inputState: InputState;

    constructor() {
        this.inputState = new InputState();
        this.attachEventListeners();
    }

    attachEventListeners() {
        window.addEventListener("keydown", (event) => {
            this.inputState.setKeyDown(event.key);
        });

        window.addEventListener("keyup", (event) => {
            this.inputState.setKeyUp(event.key);
        });
    }

    updateState(): void {
        // キーボードの状態はリアルタイムで更新されるので、特に何もしません
    }

    isKeyPressed(key: string): boolean {
        return this.inputState.isKeyPressed(key);
    }
}
