export interface InputDevice {
    updateState(): void;
    isKeyPressed(key: any): boolean;
}
