import { ServiceLocator } from "common/service_locator/ServiceLocator";
import { InputSystem } from "input_system/InputSystem";

export interface GameObject {
    serviceLocator: ServiceLocator;
    update(deltaTime: number, ...args: any[]): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
}
