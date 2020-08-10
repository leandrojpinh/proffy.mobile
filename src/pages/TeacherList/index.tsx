import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  useFocusEffect(() => {
    loadFavorites();
  });

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedItems = JSON.parse(response);
        const favoritedTeachersIds = favoritedItems.map((item: Teacher) => {
          return item.id;
        });

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  function handleToggleFiltersVisible() {
    setIsFilterVisible(!isFilterVisible);
  }

  async function hanleFiltersSubmit() {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject, week_day, time
      }
    });

    setTeachers(response.data);
    setIsFilterVisible(false);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title='Proffys'
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name='filter' size={20} color='#FFF' />
          </BorderlessButton>
        )}
      >
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder='Qual a matéria?'
              placeholderTextColor='#C1BCCC'
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Qual o dia?'
                  placeholderTextColor='#C1BCCC'
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Qual o horário?'
                  placeholderTextColor='#C1BCCC'
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={hanleFiltersSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}>
        {teachers.map((item: Teacher) => (
          <TeacherItem
            key={item.id}
            teacher={item}
            favorited={favorites.includes(item.id)} />
        ))}
      </ScrollView>
    </View>
  )
}