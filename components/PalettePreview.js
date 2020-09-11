import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const PalettePreview = ({ handlePress, palette }) => (
  <TouchableOpacity onPress={handlePress}>
    <Text style={styles.text}>{palette.paletteName}</Text>
    <FlatList
      style={styles.colorsList}
      horizontal={true}
      data={palette.colors.slice(0, 5)}
      keyExtractor={(item) => item.colorName}
      renderItem={({ item }) => (
        <View style={[styles.colorBox, { backgroundColor: item.hexCode }]} />
      )}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorsList: {
    height: 50,
    marginBottom: 20,
  },
  colorBox: {
    width: 40,
    height: 40,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 10,
  },
});

export default PalettePreview;
