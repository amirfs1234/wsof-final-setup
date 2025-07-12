import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TeamSelectorProps {
  selectedTeam: string | null;
  onSelect: (team: string) => void;
}

export default function TeamSelector({ selectedTeam, onSelect }: TeamSelectorProps) {
  const teams = ['team1', 'team2', 'team3', 'team4', 'team5']; // Mock teams

  return (
    <View style={styles.container}>
      {teams.map((team) => (
        <TouchableOpacity
          key={team}
          style={[styles.team, selectedTeam === team && styles.selected]}
          onPress={() => onSelect(team)}
        >
          <Text>{team}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  team: { padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 },
  selected: { backgroundColor: '#e0e0e0' },
});
