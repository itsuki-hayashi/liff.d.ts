interface LINEBluetoothRequestDeviceFilter {
    deviceId: string
}

interface RequestDeviceOptions {
    filters: LINEBluetoothRequestDeviceFilter[]
}

type BluetoothDeviceEvent = 'advertisementreceived' | 'gattserverdisconnected'

interface BluetoothDevice {
    id: string
    name?: string
    gatt?: BluetoothRemoteGATTServer
    watchingAdvertisements: boolean
    watchAdvertisements(): Promise<void>
    unwatchAdvertisements(): void
    addEventListener(type: BluetoothDeviceEvent, listener?: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void
    removeEventListener(type: BluetoothDeviceEvent, callback?: EventListenerOrEventListenerObject, options?: EventListenerOptions | boolean): void
}

type BluetoothRemoteGATTCharacteristicEvent = 'characteristicvaluechanged'

interface BluetoothRemoteGATTCharacteristic {
    service?: BluetoothRemoteGATTService
    uuid: string
    value?: DataView
    readValue(): Promise<DataView>
    writeValue(value: BufferSource): Promise<void>
    startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>
    stopNotifications(): Promise<BluetoothRemoteGATTCharacteristic>
    addEventListener(type: BluetoothRemoteGATTCharacteristicEvent, listener?: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void
    removeEventListener(type: BluetoothRemoteGATTCharacteristicEvent, callback?: EventListenerOrEventListenerObject, options?: EventListenerOptions | boolean): void
}

interface BluetoothRemoteGATTService {
    device: BluetoothDevice
    uuid: string
    getCharacteristic(characteristicUUID: string): Promise<BluetoothRemoteGATTCharacteristic>
}

interface BluetoothRemoteGATTServer {
    device: BluetoothDevice
    connected: boolean
    connect(): Promise<BluetoothRemoteGATTService>
    disconnect(): void
    getPrimaryService(serviceUUID: string): Promise<BluetoothRemoteGATTService>
}

interface LiffBluetooth {
    getAvailability(): Promise<boolean>
    requestDevice(options?: RequestDeviceOptions): Promise<BluetoothDevice>;
    referringDevice?: BluetoothDevice
}