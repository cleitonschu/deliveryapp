import React from 'react';
import { View } from 'react-native';
import RestaurantsList from '../components/RestaurantsList';

export default function RestaurantsScreen() {
  return (
    <View style={{flex: 1}}>
      <RestaurantsList />
    </View>
  );
}