import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import BleManager from 'react-native-ble-manager';

const Scan = () => {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false); // Add a state variable for loading indicator

  useEffect(() => {
    BleManager.start({ showAlert: true });
  }, []);
  // useEffect(() => {
  //   BleManager.start({ showAlert: false }); // Initialisation de BleManager
  // }, []);

  const handleScanButtonPress = async () => {
    if (scanning) {
      await BleManager.stopScan();
      setScanning(false);
      setLoading(false);
      return;
    }

    setLoading(true); // Show the loading indicator
    setDevices([]); // Clear previous results

    try {
      await BleManager.scan({},5, (error, device) => {
        if (error) {
          console.error(error);
          return;
        }

        console.log('Device found:', device);
        setDevices([...devices, device]);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Hide the loading indicator
      setScanning(false); // Update scanning state even if there's an error
    }
  };

  const renderItem = ({ item }) => {
    const { name, id } = item;
    const pairingLink = `#${id}`; // Replace this with the actual pairing link format

    return (
      <View style={styles.item}>
        <Text>{name}</Text>
        <Text style={styles.pairingLink}>{pairingLink}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chercher les bluetooth</Text>
      <Button
        title={scanning ? 'Stop Scan' : 'Scan Bluetooth'}
        onPress={handleScanButtonPress}
        disabled={loading} // Disable button while loading
      />
      {loading && <ActivityIndicator size="large" />}
      {devices.length === 0 && !loading && <Text style={styles.noDevices}>No devices found</Text>}
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    marginBottom: 10,
  },
  pairingLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  noDevices: {
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default Scan;
