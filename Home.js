import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet, Text, Card, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [blocks, setBlocks] = useState([
    { type: 'card', color: 'red', title: 'Card Title', image: 'https://picsum.photos/200', buttonTitle: 'Go to Welcome' },
    { type: 'title', title: 'Welcome to My App' },
    { type: 'paragraph', text: 'This is a sample paragraph.' },
  ]);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBlockIndex((prevIndex) => (prevIndex + 1) % blocks.length);
    }, 20000); // Change block every 20 seconds

    return () => clearInterval(intervalId);
  }, []);

  const animatedValues = blocks.map((block) => {
    const opacity = new Animated.Value(0);

    useEffect(() => {
      if (currentBlockIndex === block.type) {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000, // Transition duration in milliseconds
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000, // Transition duration in milliseconds
          useNativeDriver: true,
        }).start();
      }
    }, [currentBlockIndex, block.type]);

    return { opacity };
  });

  const renderBlock = (block) => {
    if (block.type === 'card') {
      return (
        <Card style={[styles.card, { backgroundColor: block.color }]}>
          <Image source={{ uri: block.image }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{block.title}</Text>
          <Button title={block.buttonTitle} onPress={() => navigation.navigate('Scan', { block })} />
        </Card>
      );
    } else if (block.type === 'title') {
      return <Text style={styles.title}>{block.title}</Text>;
    } else if (block.type === 'paragraph') {
      return <Text style={styles.paragraph}>{block.text}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {blocks.map((block, index) => (
        <Animated.View
          key={block.type}
          style={[styles.block, { opacity: animatedValues[index].opacity }]}
        >
          {renderBlock(block)}
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    width: 300,
    margin: 10,
    padding: 20,
  },
  card: {
    borderRadius: 10,
  },
  cardImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'justify',
  },
});

export default Home;
