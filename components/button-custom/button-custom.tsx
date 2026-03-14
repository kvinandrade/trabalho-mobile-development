import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

export const ButtonCustom = () => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.push('/first-page')} 
      style={styles.container}
    >
      <Text style={styles.titleButton}>Login</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    width: '90%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 12
  },
  titleButton: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600'
  }
});