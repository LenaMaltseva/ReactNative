import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ColorOption = ({ onChoice, colorName, hexCode }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    isEnabled
      ? onChoice.add({ colorName, hexCode })
      : onChoice.remove(colorName);
  }, [isEnabled]);

  return (
    <View style={[styles.optionLine, styles.flex]}>
      <View style={styles.flex}>
        <View style={[styles.box, { backgroundColor: hexCode }]} />
        <Text style={styles.text}>{colorName}</Text>
      </View>
      <Switch
        value={isEnabled}
        onValueChange={toggleSwitch}
        trackColor={{ false: '#767577', true: '#268bd2' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  optionLine: {
    paddingVertical: 15,
    borderStyle: 'solid',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    width: 30,
    height: 30,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default ColorOption;
