export class InputState {
    keys: Record<string, boolean>;
    constructor() {
        this.keys = {};
    }

    setKeyDown(key: string) {
        this.keys[key] = true;
    }

    setKeyUp(key: string) {
        this.keys[key] = false;
    }

    isKeyPressed(key: string) {
        return !!this.keys[key];
    }
}
