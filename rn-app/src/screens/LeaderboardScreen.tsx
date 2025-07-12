import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import axios from 'axios';
import { LeaderboardEntry } from '@/types';

export default function LeaderboardScreen({ route }) {
  const { gameType } = route.params;
  const { data, isLoading } = useQuery<LeaderboardEntry[]>(['leaderboard', gameType], async () => {
    const response = await axios.get(`http://localhost:3000/api/leaderboard/${gameType}`);
    return response.data;
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{gameType === 'pyramid' ? 'The Pyramid' : 'Blow Out'} Leaderboard</Text>
      {data?.map((entry, index) => (
        <View key={index} style={styles.entry}>
          <Text>{index + 1}. {entry.username}: {entry.score}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  entry: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});
