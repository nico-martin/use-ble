import React from 'react';
import ReactDOM from 'react-dom';
import { getBleServer, useBleCharacteristic } from '../src/index';

const App = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [batteryGattService, setBatteryGattService] =
    React.useState<BluetoothRemoteGATTService>(null);
  const { value } = useBleCharacteristic(batteryGattService, 0x2a19);

  const connect = () => {
    setLoading(true);
    getBleServer([0x180f]).then(({ device, server }) => {
      server.getPrimaryService(0x180f).then((battery) => {
        setBatteryGattService(battery);
        setLoading(false);
      });
    });
  };

  if (!batteryGattService) {
    return (
      <button onClick={connect} disabled={loading}>
        connect
      </button>
    );
  }

  return <div>Battery State {value || 0}%</div>;
};

ReactDOM.render(<App />, document.querySelector('#app'));
