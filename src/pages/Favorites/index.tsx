import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(() => {
    loadFavorites();
  });

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedItems = JSON.parse(response);

        setFavorites(favoritedItems);
      }
    });
  }

  return (
    <View style={styles.container}>
      <PageHeader title='Meus Proffys Favoritos' />

      <ScrollView style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}>
        {favorites.map((item: Teacher) => {
          return <TeacherItem key={item.id} teacher={item} favorited />
        })}
      </ScrollView>
    </View>
  )
}
