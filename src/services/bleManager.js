import { PermissionsAndroid } from 'react-native';
import BleManager from 'react-native-ble-manager';

export const startBluetoothManager = async () => {
  BleManager.start({ showAlert: false });

  const permission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Bluetooth Permission',
      message: 'This app needs access to Bluetooth.',
    }
  );

  if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
    console.log('Permission denied');
    return false;
  }

  return true;
};

export const startScan = (setPeripheralDevices, setIsScanning) => {
  setIsScanning(true);
  BleManager.scan([], 5, true).then(() => {
    console.log('Scanning...');
  });

  const handleDiscoverPeripheral = (peripheral) => {
    setPeripheralDevices((prevDevices) => [...prevDevices, peripheral]);
  };

  return handleDiscoverPeripheral;
};

export const connectToDevice = async (peripheralId, setSensorData) => {
  try {
    await BleManager.connect(peripheralId);
    console.log('Connected to device:', peripheralId);

    await BleManager.retrieveServices(peripheralId);
    await BleManager.startNotification(
      peripheralId,
      '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
      'beb5483e-36e1-4688-b7f5-ea07361b26a8'
    );

    const data = await BleManager.read(
      peripheralId,
      '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
      'beb5483e-36e1-4688-b7f5-ea07361b26a8'
    );
    console.log('Received data:', data);
    setSensorData((prevData) => [...prevData, data]);
  } catch (error) {
    console.error('Error connecting to device:', error);
  }
};
