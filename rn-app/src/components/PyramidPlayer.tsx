import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface PyramidPlayerProps {
  playerId: string;
  selected: boolean;
  onSelect: (playerId: string) => void;
}

export default function PyramidPlayer({ playerId, selected, onSelect }: PyramidPlayerProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={() => onSelect(playerId)}
    >
      <Text>{playerId}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  selected: { backgroundColor: '#e0e0e0' },
});
