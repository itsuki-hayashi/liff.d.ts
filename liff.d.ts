import { Message } from "@line/bot-sdk"

type LiffErrorCode = 'INIT_FAILED' | 'INVALID_ARGUMENT' | 'UNAUTHORIZED'
    | 'FORBIDDEN' | 'INVALID_CONFIG' | 'INVALID_ID_TOKEN'
    | 'INVALID_ARGUMENT' | 'THINGS_NO_LINKED_DEVICES' | 'BLUETOOTH_SETTING_OFF'
    | 'THINGS_TERMS_NOT_AGREED' | 'BLUETOOTH_NO_LOCATION_PERMISSION'
    | 'BLUETOOTH_LOCATION_DISABLED' | 'BLUETOOTH_LE_API_UNAVAILABLE'
    | 'BLUETOOTH_CONNECT_FAILED' | 'BLUETOOTH_ALREADY_CONNECTED'
    | 'BLUETOOTH_CONNECTION_LOST' | 'BLUETOOTH_UNSUPPORTED_OPERATION'
    | 'BLUETOOTH_SERVICE_NOT_FOUND' | 'BLUETOOTH_CHARACTERISTIC_NOT_FOUND'

interface LiffError {
    code: LiffErrorCode
    message: string
}

interface LiffUserProfile {
    userId: string
    displayName: string
    pictureUrl: string
    statusMessage: string
}

interface Liff {
    init(config: { liffId: string }): Promise<void>
    init(config: { liffId: string }, successCallback: () => void, errorCallback: (error: LiffError) => void): void
    getOS(): 'ios' | 'android' | 'web'
    getLanguage(): string
    getVersion(): string
    isInClient(): boolean
    isLoggedIn(): boolean
    login(loginConfig?: { redirectUri?: string }): void
    logout(): void
    getAccessToken(): string
    getProfile(): Promise<LiffUserProfile>
    sendMessages(messages: Message[]): Promise<void>
    openWindow(params: {
        url: string
        external: boolean
    }): void
    scanCode(): Promise<{ value: string }>
    closeWindow(): void
    initPlugins(pluginList: string[]): Promise<void>
    bluetooth: LiffBluetooth 
}




declare const liff: Liff