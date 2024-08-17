import { InputState } from "InputState";

export class InputSystem {
    inputState: InputState;

    constructor() {
        this.inputState = new InputState();

        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    private handleKeyDown(event: KeyboardEvent) {
        this.inputState.setKeyDown(event.key);
    }

    private handleKeyUp(event: KeyboardEvent) {
        this.inputState.setKeyUp(event.key);
    }

    isKeyPressed(key: string) {
        return this.inputState.isKeyPressed(key);
    }
}
