import { InputSystem } from "InputSystem";

/**
 * GameController class. This class will handle the game controls.
 */
export class GameController {
    inputSystem: InputSystem;

    constructor() {
        this.inputSystem = new InputSystem();
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
