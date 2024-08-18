import { GameComponent } from "common/interfaces/GameComponent.js";

export class ServiceLocator {
    private components: Map<string, GameComponent> = new Map();

    addComponent<T extends GameComponent>(name: string, component: T): void {
        this.components.set(name, component);
    }

    getComponent<T extends GameComponent>(name: string): T | undefined {
        return this.components.get(name) as T;
    }
}
