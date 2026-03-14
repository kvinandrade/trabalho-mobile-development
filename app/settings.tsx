import { useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useVinyls } from '../src/contexts/VinylsContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { vinyls, removeVinyl } = useVinyls();

  const customVinyls = vinyls.filter((v) => v.isCustom);

  const handleEdit = (id: string) => {
    router.push(`/edit-product/${id}`);
  };

  const handleRemove = (id: string) => {
    removeVinyl(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar discos</Text>
      <FlatList
        data={customVinyls}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhum disco adicionado ainda.</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.artist}</Text>
              </View>
              <View style={styles.itemActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEdit(item.id)}
                >
                  <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleRemove(item.id)}
                >
                  <Text style={[styles.actionText, styles.deleteText]}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  emptyText: {
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
  },
  itemCard: {
    backgroundColor: '#fafafa',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  itemActions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#1b74e4',
    marginLeft: 8,
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
  },
  deleteButton: {
    backgroundColor: '#e53e3e',
  },
  deleteText: {
    color: '#fff',
  },
  backButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  backText: {
    color: '#1b74e4',
    fontWeight: '700',
  },
});
