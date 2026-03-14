import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVinyls } from '../../contexts/VinylsContext';

export function ProductDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getVinyl } = useVinyls();

  const vinyl = id ? getVinyl(id) : undefined;

  const handleBack = () => {
    router.back();
  };

  if (!vinyl) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Disco não encontrado.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleBack}>
          <Text style={styles.retryText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top, paddingBottom: insets.bottom }]}> 
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <Image
          source={typeof vinyl.image === 'string' ? { uri: vinyl.image } : vinyl.image}
          style={styles.image}
        />

        <View style={styles.body}>
          <Text style={styles.title}>{vinyl.title}</Text>
          <Text style={styles.artist}>{vinyl.artist}</Text>
          <Text style={styles.description}>{vinyl.description}</Text>

          <Text style={styles.sectionTitle}>Faixas</Text>
          {vinyl.tracks.map((track, index) => (
            <Text key={track} style={styles.track}>
              {index + 1}. {track}
            </Text>
          ))}

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Preço</Text>
            <Text style={styles.price}>R$ {vinyl.price.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingBottom: 32,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#e53e3e',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#1b74e4',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
  backButton: {
    margin: 16,
  },
  backText: {
    color: '#1b74e4',
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
  body: {
    padding: 16,
    maxWidth: 700,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  artist: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  track: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  priceRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
  },
});

