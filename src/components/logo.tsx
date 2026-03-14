import { Image, StyleSheet, Text, View } from 'react-native';

type LogoProps = {
  variant?: 'small' | 'default';
};

export function Logo({ variant = 'default' }: LogoProps) {
  const isSmall = variant === 'small';

  return (
    <View style={[styles.container, isSmall && styles.containerSmall]}>
      <Image
        source={require('../assets/disko-logo.png')}
        style={[styles.image, isSmall && styles.imageSmall]}
        resizeMode="contain"
      />
      {!isSmall && <Text style={styles.subtext}>Loja de vinis</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 220,
    height: 120,
  },
  imageSmall: {
    width: 70,
    height: 40,
  },
  subtext: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
  containerSmall: {
    marginBottom: 0,
  },
});
