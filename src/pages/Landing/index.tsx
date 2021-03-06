import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { View, Image, Text } from 'react-native';
import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studeIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import api from '../../services/api';

export default function Landing() {
  const { navigate } = useNavigation();

  const [connections, setConnections] = useState(0);

  useEffect(() => {
    api.get('/connections').then(response => {
      setConnections(response.data.total);
    })
  }, []);

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses');
  }

  function handleNavigateToStudyPage() {
    navigate('Study');
  }
  
  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudyPage}>
          <Image source={studeIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToGiveClassesPage}>
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {connections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  )
}