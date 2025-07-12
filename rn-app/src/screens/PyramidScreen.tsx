import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGameData } from '@/hooks/useGameData';
import PyramidPlayer from '@/components/PyramidPlayer';

export default function PyramidScreen() {
  const [players, setPlayers] = useState<string[]>([]);
  const { useCreatePyramidGame } = useGameData();
  const { mutate: createGame, isLoading } = useCreatePyramidGame();
  const navigation = useNavigation();

  const handleSelectPlayer = (playerId: string) => {
    if (players.length < 5 && !players.includes(playerId)) {
      setPlayers([...players, playerId]);
    }
  };

  const handleSubmit = () => {
    if (players.length === 5) {
      createGame(players, {
        onSuccess: (game) => {
          navigation.navigate('Leaderboard', { gameType: 'pyramid' });
        },
      });
    } else {
      alert('Please select exactly 5 players');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Pyramid</Text>
      <Text>Select 5 players:</Text>
      {/* Mock player list - in a real app, fetch from API */}
      {['player1', 'player2', 'player3', 'player4', 'player5'].map((playerId) => (
        <PyramidPlayer
          key={playerId}
          playerId={playerId}
          selected={players.includes(playerId)}
          onSelect={handleSelectPlayer}
        />
      ))}
      <Button
        title="Create Game"
        onPress={handleSubmit}
        disabled={isLoading || players.length !== 5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});
