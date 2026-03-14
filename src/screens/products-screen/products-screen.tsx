import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo } from '../../components/logo';
import { useAuth } from '../../contexts/AuthContext';
import { useVinyls } from '../../contexts/VinylsContext';

export function ProductsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { logout } = useAuth();
  const { vinyls } = useVinyls();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const handlePressVinyl = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}> 
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <Logo variant="small" />
          <View>
            <Text style={styles.title}>Disko</Text>
            <Text style={styles.subtitle}>Loja de discos em vinil</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={vinyls}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => handlePressVinyl(item.id)}
              onLongPress={() => router.push(`/edit-product/${item.id}`)}
            >
              <Image source={imageSource} style={styles.thumbnail} />
              <View style={styles.cardBody}>
                <Text numberOfLines={1} style={styles.productTitle}>
                  {item.title}
                </Text>
                <Text numberOfLines={1} style={styles.productArtist}>
                  {item.artist}
                </Text>
                <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={() => (
          <View style={styles.footerButtons}>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => router.push('/add-product')}
            >
              <Text style={styles.footerButtonText}>Adicionar disco</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerButton, styles.footerButtonSecondary]}
              onPress={() => router.push('/settings')}
            >
              <Text style={[styles.footerButtonText, styles.footerButtonSecondaryText]}>
                Gerenciar discos
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e53e3e',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  footerButtons: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  footerButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1b74e4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  footerButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1b74e4',
  },
  footerButtonSecondaryText: {
    color: '#1b74e4',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  thumbnail: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  productArtist: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  price: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '700',
  },
});

