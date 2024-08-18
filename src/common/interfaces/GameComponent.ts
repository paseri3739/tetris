import { GameObject } from "./GameObject";

export interface GameComponent {
    owner: GameObject;
}
