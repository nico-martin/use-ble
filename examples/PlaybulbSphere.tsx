import React from 'react';
import ReactDOM from 'react-dom';
import { getBleServer, useBleCharacteristic } from '../src/index';

const App = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [lightGattService, setLightGattService] =
    React.useState<BluetoothRemoteGATTService>(null);
  const { value, writeValue } = useBleCharacteristic(lightGattService, 0xff0c);

  const connect = () => {
    setLoading(true);
    getBleServer([0xff0f]).then(({ device, server }) => {
      server.getPrimaryService(0xff0f).then((light) => {
        setLightGattService(light);
        setLoading(false);
      });
    });
  };

  const [r, g, b] = value
    ? [value.getUint8(1), value.getUint8(2), value.getUint8(3)]
    : [0, 0, 0];

  if (!lightGattService) {
    return (
      <button onClick={connect} disabled={loading}>
        connect
      </button>
    );
  }

  return (
    <div>
      <p>
        rgb({r}, {g}, {b})
      </p>
      <p>
        <button onClick={() => writeValue(new Uint8Array([0, 255, 0, 0]))}>
          set red
        </button>{' '}
        <button onClick={() => writeValue(new Uint8Array([0, 0, 255, 0]))}>
          set blue
        </button>
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
