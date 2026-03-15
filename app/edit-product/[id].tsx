import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVinyls } from '../../src/contexts/VinylsContext';

export default function EditProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getVinyl, updateVinyl, removeVinyl } = useVinyls();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [gender, setGender] = useState<'feminino' | 'masculino'>('feminino');

  useEffect(() => {
    if (!id) return;
    const vinyl = getVinyl(id);
    if (!vinyl) return;

    setTitle(vinyl.title);
    setArtist(vinyl.artist);
    setPrice(String(vinyl.price));
    setDescription(vinyl.description);
    setImageUrl(typeof vinyl.image === 'string' ? vinyl.image : '');
    setGender(vinyl.gender);
  }, [id, getVinyl]);

  const handleSave = () => {
    if (!id) return;
    if (!title.trim() || !artist.trim()) {
      Alert.alert('Validação', 'Título e artista são obrigatórios.');
      return;
    }

    updateVinyl(id, {
      title: title.trim(),
      artist: artist.trim(),
      price: Number(price) || 0,
      description: description.trim(),
      image: imageUrl.trim() ? { uri: imageUrl.trim() } : undefined,
      gender,
    });

    router.replace('/products');
  };

  const handleDelete = () => {
    if (!id) return;

    Alert.alert('Excluir disco', 'Deseja remover este disco?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          removeVinyl(id);
          router.replace('/products');
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top + 20 }]} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Editar disco</Text>

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

        <View style={styles.field}>
          <Text style={styles.label}>Gênero</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'feminino' && styles.genderSelected]}
              onPress={() => setGender('feminino')}
            >
              <Text style={[styles.genderText, gender === 'feminino' && styles.genderTextSelected]}>
                Feminino
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'masculino' && styles.genderSelected]}
              onPress={() => setGender('masculino')}
            >
              <Text style={[styles.genderText, gender === 'masculino' && styles.genderTextSelected]}>
                Masculino
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonLabel}>Salvar alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Excluir disco</Text>
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
    padding: 20,
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
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fafafa',
  },
  genderSelected: {
    backgroundColor: '#1b74e4',
    borderColor: '#1b74e4',
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  genderTextSelected: {
    color: '#fff',
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
  deleteButton: {
    marginTop: 12,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e53e3e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#e53e3e',
    fontWeight: '700',
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
