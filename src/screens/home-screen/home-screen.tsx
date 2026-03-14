import { useState } from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native'
import { ButtonCustom } from '../../../components/button-custom/button-custom'
import Logo from '../../assets/disko-logo.png'
import { styles } from './styles'

export const Home = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Image
          source={Logo}
          style={styles.styleImage}
          resizeMode='contain'
        />

        <Text style={styles.titleInput}>E-mail:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />

        <Text>{email}</Text>

        <Text style={styles.titleInput}>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <ButtonCustom />
      </View>
    </ScrollView>
  )
}