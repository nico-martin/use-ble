# use-ble

> A react hook thet helps you to interact with Bluetooth Low Energy (BLE) over WebBluetooth

## Install

```bash
npm install --save use-ble
```

```bash
yarn add use-ble
```

## Examples

There are a couple of examples in the `examples/` folder.

## Documentation

### getBleServer

`getBleServer` is a async function that returns the device and the GATT-server.

#### Parameters

- **optionalServices**: An array of bluetooth service UUID you want to use later on
- **filters**: An array of `BluetoothRequestDeviceFilter` (for example `{name: 'PLAYBULB sphere'}`)
- **onDisconnect**: A callback that passes the device and is fired on disconnect

### useBleCharacteristic

`useBleCharacteristic` is a react hook that makes it very convenient to interact with a BLE GATT-Characteristic.

#### Parameters

- **service**: the GATT Service where the characteristic is located
- **characteristicUUID**: the bluetooth characteristic UUID
- **promiseQueueWriteOnlyLast**: It determines whether the queue should be processed one after the other or whether the last promise added should always be executed.

#### Return

- **value**: DataView (reactive)
- **writeValue**: (DataView) => void
- **readValue**: () => Promise<DataView | Error>;