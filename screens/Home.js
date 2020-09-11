import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation, route }) => {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const newPalette = route.params ? route.params.newPalette : undefined;

  const fetchColorPalettes = useCallback(async () => {
    const res = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    if (res.ok) {
      const palettes = await res.json();
      setColorPalettes(palettes);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorPalettes();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    fetchColorPalettes();
  }, []);

  useEffect(() => {
    if (newPalette) {
      setColorPalettes((palettes) => [newPalette, ...palettes]);
    }
  }, [newPalette]);

  return (
    <View style={styles.container}>
      <FlatList
        data={colorPalettes}
        keyExtractor={(item) => item.paletteName}
        renderItem={({ item }) => (
          <PalettePreview
            handlePress={() => {
              navigation.navigate('ColorPalette', item);
            }}
            palette={item}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        // refreshControl={<RefreshControl />} ability to use custom loader
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('ColorPaletteModal');
        }}>
        <Text style={styles.buttonText}>Create new palette</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    height: 44,
    width: '70%',
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: '15%',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Home;
