import { InputState } from "common/input_system/InputState";
import { InputDevice } from "interfaces/InputDevice";

/**
 * GameController class. This class will handle the game controls.
 */
export class GameController implements InputDevice {
    inputState: InputState;

    constructor() {
        this.inputState = new InputState();
    }

    updateState(): void {}

    isKeyPressed(key: any): boolean {
        return this.inputState.isKeyPressed(key);
    }
}
