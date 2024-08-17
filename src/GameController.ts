import { InputSystem } from "InputSystem";
import { KeyboardInput } from "KeyboardInput";

/**
 * GameController class. This class will handle the game controls.
 */
export class GameController {
    inputSystem: InputSystem;

    constructor() {
        this.inputSystem = new InputSystem([new KeyboardInput()]);
    }

    /**
     * Update the game controls.
     */
    update() {
        if (this.inputSystem.isKeyPressed("ArrowUp")) {
            console.log("Up key is pressed");
        }
        if (this.inputSystem.isKeyPressed("ArrowDown")) {
            console.log("Down key is pressed");
        }
        if (this.inputSystem.isKeyPressed("ArrowLeft")) {
            console.log("Left key is pressed");
        }
        if (this.inputSystem.isKeyPressed("ArrowRight")) {
            console.log("Right key is pressed");
        }
    }
}
