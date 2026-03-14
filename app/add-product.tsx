import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useVinyls } from '../src/contexts/VinylsContext';

export default function AddProductScreen() {
  const router = useRouter();
  const { addVinyl } = useVinyls();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState('200');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSave = () => {
    if (!title.trim() || !artist.trim()) {
      Alert.alert('Validação', 'Título e artista são obrigatórios.');
      return;
    }

    addVinyl({
      title: title.trim(),
      artist: artist.trim(),
      price: Number(price) || 0,
      description: description.trim(),
      image: imageUrl.trim() ? { uri: imageUrl.trim() } : require('../src/assets/disko-logo.png'),
      tracks: [],
    });

    router.replace('/products');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Adicionar disco</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholder="Ex: Midnights"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Artista</Text>
          <TextInput
            value={artist}
            onChangeText={setArtist}
            style={styles.input}
            placeholder="Ex: Taylor Swift"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Preço</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            style={styles.input}
            placeholder="R$ 200"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.multiline]}
            placeholder="Ex: Álbum de vinil..."
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>URL da imagem (opcional)</Text>
          <TextInput
            value={imageUrl}
            onChangeText={setImageUrl}
            style={styles.input}
            placeholder="https://..."
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonLabel}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fafafa',
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  button: {
    height: 52,
    borderRadius: 10,
    backgroundColor: '#1b74e4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 14,
    alignItems: 'center',
  },
  cancelText: {
    color: '#1b74e4',
    fontWeight: '700',
  },
});
