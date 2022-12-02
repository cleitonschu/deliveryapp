import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList, ActivityIndicator, ImageBackground, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Api from '../services/Api';
import icon from '../../assets/icon.png';

export default function RestaurantPage({ route }) {
  const [loading, setLoading] = useState(false);  
  const restaurantID = route.params?.id || "";
  const [restaurant, setRestaurant] = useState({});
  const { restaurantsFavorites } = useSelector((state) => state.favoriteReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    loadRestaurant(restaurantID);
  }, []);

  const loadRestaurant = async (restaurantID) => {
    setLoading(true);
    try {
      var response = await Api.getRestaurant(restaurantID);
      if(response && response?._id){
        setRestaurant(response);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error on loading restaurant!");
    } finally {
      setLoading(false);
    } 
  }

  const handleFavorite = (id) => {
    var arrFavorites = restaurantsFavorites || [];
    const found = arrFavorites.find(el => el === id);
    if(found){
      arrFavorites = arrFavorites.filter(el => { 
        return el !== id; 
      });
    } else {
      arrFavorites = [...arrFavorites, id];
    }
    dispatch({ type: 'SET_RESTAURANTS', payload: { restaurantsFavorites: arrFavorites }});
  } 

  return (
    <View style={styles.container}>
      {loading && !restaurant?._id ?
        <View style={[styles.container, {justifyContent: "center", alignItems:  "center"}]}>
          <ActivityIndicator />
        </View>
      :
        <FlatList
          ListHeaderComponent={(
            <View>
              <ImageBackground source={restaurant.image?.url && restaurant.image.url !== "" ? {uri: restaurant.image.url} : icon} style={styles.imageBanner} imageStyle={styles.imageBanner}>
              </ImageBackground>
              <View style={styles.bodyPage}>
                <View style={[styles.row, {justifyContent: "space-between"}]}>
                  <Text style={styles.title}>{restaurant.name ? restaurant.name : "Restaurant Name"}</Text>  
                  <TouchableHighlight onPress={() => handleFavorite(restaurant._id)} style={{justifyContent: "center"}} underlayColor="rgba(255, 255, 255, 0)">
                    {restaurantsFavorites && restaurantsFavorites.find(el => el === restaurant._id) ?
                      <MaterialCommunityIcons name="heart" size={26} color={"red"} style={{marginTop: 5}}/>
                    :
                      <MaterialCommunityIcons name="heart-outline" size={26} color={"#888"} style={{marginTop: 5}}/>
                    }
                  </TouchableHighlight>
                </View>
                {restaurant?.addressInfo ?
                  <View style={styles.itemContact}>
                    <MaterialCommunityIcons name="map-marker-radius" size={24} color={"#888"} style={{margin: 5}}/>
                    <Text style={styles.descTitle}>{restaurant.addressInfo.address}</Text> 
                  </View>
                : <></>} 
                {restaurant?.contacts && restaurant.contacts?.phoneNumber ?
                  <View style={styles.itemContact}>
                    <MaterialCommunityIcons name="phone" size={24} color={"#888"} style={{margin: 5}}/>
                    <Text style={styles.descTitle}>{restaurant.contacts.phoneNumber}</Text> 
                  </View>
                : <></>} 
                {restaurant?.contacts && restaurant.contacts?.email ?
                  <View style={styles.itemContact}>
                    <MaterialCommunityIcons name="email" size={24} color={"#888"} style={{margin: 5}}/>
                    <Text style={styles.descTitle}>{restaurant.contacts.email}</Text> 
                  </View>
                : <></> }
              </View>
              {restaurant?.cuisines && restaurant.cuisines.length > 0 ?
               <Text style={[styles.title, {paddingHorizontal: 15}]}>Cuisines</Text>  
              :<></>}
            </View>
          )}
          data={restaurant?.cuisines ? restaurant.cuisines : []}
          initialNumToRender="10"
          keyExtractor={key => key._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.listItem} >
              <Text style={styles.titleItem}>{item?.name ? item.name.en : "Cuisines Name"}</Text>
            </View>  
          )}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  row:{
    flexDirection: "row"
  },

  imageBanner:{
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height/3.5,
    resizeMode: "cover",
  },

  bodyPage:{
    paddingHorizontal: 15
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 12
  },

  descTitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5
  },

  listItem: {
    backgroundColor: '#ededed',
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  titleItem: {
    fontSize: 14,
    marginLeft: 15,
    fontWeight: "600"
  },

  itemContact: {
    flexDirection: "row",
    alignItems: "center"
  }

});