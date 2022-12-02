import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantsScreen from '../screens/RestaurantsScreen';
import RestaurantPage from '../screens/RestaurantPage';

const Stack = createNativeStackNavigator();
export default function AppNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="RestaurantsScreen" 
        component={RestaurantsScreen} 
        options= {{
          title: "Restaurants",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: "#f8f8f8",
            borderBottomColor: "#5e5e5e",
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontSize: 18,
          }
        }}
      />
      <Stack.Screen 
        name="RestaurantPage" 
        component={RestaurantPage} 
        options={({ route }) => ({ 
          title: route.params.title,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: "#f8f8f8",
            borderBottomColor: "#5e5e5e",
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontSize: 18,
          }
        })}
      />
    </Stack.Navigator>
  );
}