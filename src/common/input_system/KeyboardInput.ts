import { InputState } from "common/input_system/InputState";
import { InputDevice } from "interfaces/InputDevice";

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
