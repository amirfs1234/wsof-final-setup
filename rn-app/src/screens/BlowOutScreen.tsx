import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGameData } from '@/hooks/useGameData';
import TeamSelector from '@/components/TeamSelector';

export default function BlowOutScreen() {
  const [team, setTeam] = useState<string | null>(null);
  const { useCreateBlowOutGame } = useGameData();
  const { mutate: createGame, isLoading } = useCreateBlowOutGame();
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (team) {
      createGame(team, {
        onSuccess: () => {
          navigation.navigate('Leaderboard', { gameType: 'blowout' });
        },
      });
    } else {
      alert('Please select a team');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blow Out</Text>
      <Text>Select a team:</Text>
      <TeamSelector selectedTeam={team} onSelect={setTeam} />
      <Button
        title="Create Game"
        onPress={handleSubmit}
        disabled={isLoading || !team}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});
