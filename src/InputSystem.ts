import { InputDevice } from "interfaces/InputDevice";

export class InputSystem {
    devices: InputDevice[] = [];

    constructor(inputDevices: InputDevice[]) {
        this.devices.push(...inputDevices);
    }

    addDevice(inputDevice: InputDevice) {
        this.devices.push(inputDevice);
    }

    updateState() {
        this.devices.forEach((device) => {
            device.updateState();
        });
    }

    isKeyPressed(key: any) {
        return this.devices.some((device) => device.isKeyPressed(key));
    }
}
