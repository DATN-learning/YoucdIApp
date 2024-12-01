import React, {useRef, useEffect} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

const PulsingScore = ({score}: {score: string | null}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Scale animation

  useEffect(() => {
    if (score !== null) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [score]);

  return (
    <View style={styles.container}>
      {score !== null && (
        <Animated.View style={[styles.scoreBox, {transform: [{scale: scaleAnim}]}]}>
          <Text style={styles.scoreText}>Điểm của bạn: {score}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  scoreBox: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scoreText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default PulsingScore;
