import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import {blue} from './image/bluetooth.jpeg'

const { width, height } = Dimensions.get('window');

const CardView = () => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={blue} // Remplacez l'URL par votre image
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Titre de la carte</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
          risus porta, aliquet urna id, tincidunt ipsum.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: height * 0.3,
    width: '100%',
    backgroundColor: '#3498db',
    marginBottom: 10,
    elevation: 3, // Pour l'ombre sur Android
    shadowColor: '#000', // Pour l'ombre sur iOS
    shadowOpacity: 0.3, // Pour l'ombre sur iOS
    shadowOffset: { width: 0, height: 2 }, // Pour l'ombre sur iOS
    shadowRadius: 2, // Pour l'ombre sur iOS
  },
  imageContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
    color : 'fff'
  },
});

export default CardView;
