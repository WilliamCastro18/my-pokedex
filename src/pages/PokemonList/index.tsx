import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { createStyles } from './styles';
import { useTheme } from '../../global/themes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import PokemonDetailScreen from '../PokemonDetail';
import { useLayoutEffect } from 'react';



type PokemonListItem = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
};

const MOCK_POKEMON_LIST: PokemonListItem[] = [
  {
    id: 1,
    name: 'bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['grass', 'poison'],
  },
  {
    id: 2,
    name: 'ivysaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    types: ['grass', 'poison'],
  },
  {
    id: 4,
    name: 'charmander',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    types: ['fire'],
  },
  {
    id: 7,
    name: 'squirtle',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    types: ['water'],
  },
  {
    id: 8,
    name: 'Wartortle',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
    types: ['water'],
  },
  {
    id: 25,
    name: 'pikachu',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: ['electric'],
  },
  {
    id: 104,
    name: 'Cubone',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png',
    types: ['Ground'],
  },
  {
    id: 105,
    name: 'Marowak',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/105.png',
    types: ['Ground'],
  },
];

export default function PokemonListScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'PokemonList'>>();

  const handleLogout = () => {
    // Navegar de volta para a tela de login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity 
      style={ styles.buttonSair }
      onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    ),
  });
}, [navigation]);

  const renderItem = ({ item }: { item: PokemonListItem }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('PokemonDetail', { id: item.id })}>
      <View style={styles.cardLeft}>
        <Text style={styles.cardName}>{item.name}</Text>
        <View style={styles.typeContainer}>
          {item.types.map((type) => (
            <View key={type} style={styles.typeBadge}>
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Pokédex</Text>
      <FlatList
        data={MOCK_POKEMON_LIST}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

