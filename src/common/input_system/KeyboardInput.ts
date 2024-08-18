import { InputDevice } from "common/interfaces/InputDevice.js";
import { InputState } from "./InputState.js";

export class KeyboardInput implements InputDevice {
    inputState: InputState;

    constructor() {
        this.inputState = new InputState();
    }

    updateState(): void {}

    isKeyPressed(key: any): boolean {
        return this.inputState.isKeyPressed(key);
    }
}
