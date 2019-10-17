interface LINEBluetoothRequestDeviceFilter {
    deviceId: string
}

interface RequestDeviceOptions {
    filters: LINEBluetoothRequestDeviceFilter[]
}

interface BluetoothDevice {
    id: string
    name?: string
    gatt?
}

interface BluetoothRemoteGATTCharacteristic {
    service?: BluetoothRemoteGATTService
    uuid: string
    value?: DataView
    readValue(): Promise<DataView>
    writeValue(value: BufferSource): Promise<void>
    startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>
    stopNotifications(): Promise<BluetoothRemoteGATTCharacteristic>
    addEventListener
}

interface BluetoothRemoteGATTService {
    device: BluetoothDevice
    uuid: string
    getCharacteristic(characteristicUUID: string): Promise<BluetoothRemoteGATTCharacteristic>
}

interface BluetoothRemoteGATTServer {
    device: BluetoothDevice
    connected: boolean
}

interface LiffBluetooth {
    getAvailability(): Promise<boolean>
    requestDevice(options?: RequestDeviceOptions): Promise<BluetoothDevice>;
}