import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

import { Sizes } from '../../constants/ResponsiveSizes';

const PreferencesScreen = ({
  min,
  setMin,
  max,
  setMax,
  setMeters,
  toggleOptions,
  setToggleOptions,
  setToggleCitySearch,
  type,
  setType,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [miles, setMiles] = useState('5 Miles');

  const [cuisines, setCuisines] = useState([
    { cuisine: 'American', selected: false },
    { cuisine: 'Italian', selected: false },
    { cuisine: 'Chinese', selected: false },
    { cuisine: 'Japanese', selected: false },
    { cuisine: 'Mexican', selected: false },
    { cuisine: 'Soul Food', selected: false },
    { cuisine: 'Indian', selected: false },
    { cuisine: 'Seafood', selected: false },
    { cuisine: 'Thai', selected: false },
    { cuisine: 'Korean', selected: false },
    { cuisine: 'Malaysian', selected: false },
    { cuisine: 'Peruvian', selected: false },
    { cuisine: 'Middle Eastern', selected: false },
    { cuisine: 'British', selected: false },
    { cuisine: 'Tapas', selected: false },
    { cuisine: 'Puerto Rican', selected: false },
    { cuisine: 'Turkish', selected: false },
    { cuisine: 'Russian', selected: false },
    { cuisine: 'Taiwanese', selected: false },
    { cuisine: 'Cajun', selected: false },
    { cuisine: 'Moroccan', selected: false },
    { cuisine: 'African', selected: false },
    { cuisine: 'Jamaican', selected: false },
    { cuisine: 'Greek', selected: false },
    { cuisine: 'French', selected: false },
    { cuisine: 'German', selected: false },
    { cuisine: 'Armenian', selected: false },
    { cuisine: 'Bangladesh', selected: false },
    { cuisine: 'Brazilian', selected: false },
    { cuisine: 'Lebanese', selected: false },
    { cuisine: 'Cantonese', selected: false },
    { cuisine: 'Spanish', selected: false },
    { cuisine: 'Ecuadorian', selected: false },
    { cuisine: 'Mediterranean', selected: false },
    { cuisine: 'Colombian', selected: false },
    { cuisine: 'Cuban', selected: false },
    { cuisine: 'Afgan', selected: false },
    { cuisine: 'Australian', selected: false },
    { cuisine: 'Austrian', selected: false },
    { cuisine: 'Belgian', selected: false },
    { cuisine: 'Caribbean', selected: false },
    { cuisine: 'Vietnamese', selected: false },
    { cuisine: 'Iranian', selected: false },
    { cuisine: 'Egyptian', selected: false },
    { cuisine: 'Haitian', selected: false },
    { cuisine: 'Cambodian', selected: false },
    { cuisine: 'Czech', selected: false },
    { cuisine: 'Fast Food', selected: false },
  ]);

  const navigation = useNavigation();

  const handlePreferencesModal = () => {
    setIsModalOpen(true);
  };

  const openPreferences = useCallback(() => {
    if (isModalOpen) {
      navigation.navigate('PreferencesModal', {
        min: min,
        setMin: setMin,
        max: max,
        setMax: setMax,
        setMeters: setMeters,
        miles,
        setMiles,
        type: type,
        setType: setType,
        cuisines: cuisines,
        setCuisines: setCuisines,
        setIsModalOpen: setIsModalOpen,
      });
    }
  }, [
    cuisines,
    isModalOpen,
    max,
    miles,
    min,
    navigation,
    setMax,
    setMeters,
    setMin,
    setType,
    type,
  ]);

  useEffect(() => {
    openPreferences();
  }, [openPreferences, isModalOpen]);

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: Sizes.hp18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePreferencesModal}>
        <Text style={styles.text}>Select Preferences</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PreferencesScreen;
