import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableHighlight, ActivityIndicator, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Api from '../services/Api';
import icon from '../../assets/icon.png';
import { useSelector, useDispatch } from 'react-redux';

export default function RestaurantsList() {
  const navigation = useNavigation();
  const { loading, moreLoading, error, data, offset, limit, hasNextPage} = useSelector((state) => state.apiReducer);
  const { restaurantsFavorites } = useSelector((state) => state.favoriteReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if(error && error != "")
      Alert.alert("Error", error);
  }, [error]);

  const loadRestaurants = async () => {
    console.log("loading restaurant " + new Date());
    try {
      if(hasNextPage && !moreLoading){
        dispatch({ type: 'API_REQUEST', payload: { offset: offset }});
        const response = await Api.getRestaurants(offset, limit);
        if(response && response?.docs){
          dispatch({ type: 'API_SUCCESS', data: response });
        }
      } else {
        console.log("No more data...")
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: 'API_FAILURE', error: "Error on loading restaurants!" });
    }     
  }

  const renderFooter = () => (
    <View style={styles.footerText}>
      {moreLoading && <ActivityIndicator />}
      {!hasNextPage ? 
        <Text>No more restaurant at the moment!</Text>
      : <></>}
    </View>
  )

  const renderEmpty = () => (
    <View style={[styles.container, {marginTop: 80, padding: 15}]}>
      <Text style={{marginBottom: 15, textAlign: "center"}}>No data at the moment!</Text>
      <Button onPress={() => loadRestaurants()} title='Refresh'/>
    </View>
  )

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

  const handleNavigate = (id, name) => {
    navigation.navigate('RestaurantPage', { id, title: name });
  }

  return (
  <>
    {loading ?
      <View style={[styles.container, {justifyContent: "center", alignItems:  "center"}]}>
        <ActivityIndicator />
      </View>
    :
      <View style={styles.container}>
        <FlatList
          data={data.docs}
          initialNumToRender="10"
          keyExtractor={key => key._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <TouchableHighlight onPress={() => handleNavigate(item._id, item.name ? item.name : "Restaurant Name")} style={{width: "90%", paddingRight: 15}} underlayColor="rgba(255, 255, 255, 0.0)">
                <View style={[styles.row, {alignItems: "center"}]}>  
                  <Image 
                    style={styles.imgItem}
                    source={item.image?.url && item.image.url !== "" ? {uri: item.image.url} : icon}
                  />
                  <View>
                    <Text style={styles.titleItem}>{item.name ? item.name : "Restaurant Name"}</Text>   
                    {item?.mealType ?  
                      <Text style={styles.descItem}>{item.mealType.trim()}</Text>   
                    : <></>}
                  </View>
                </View>
              </TouchableHighlight> 
              <TouchableHighlight onPress={() => handleFavorite(item._id)} style={{alignItems: "center", width: "10%"}} underlayColor="rgba(255, 255, 255, 0)">
                {restaurantsFavorites && restaurantsFavorites.find(el => el === item._id) ?
                  <MaterialCommunityIcons name="heart" size={24} color={"red"} style={{}}/>
                :
                  <MaterialCommunityIcons name="heart-outline" size={24} color={"#888"} style={{}}/>
                }
              </TouchableHighlight>
            </View>     
          )}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReached={loadRestaurants}
          onEndReachedThreshold={0.1}
        />
      </View>
    }
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  row:{
    flexDirection: "row"
  },

  listItem: {
    width: "100%",
    backgroundColor: '#ededed',
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  imgItem:{
    width: Dimensions.get("window").width/5.5,
    height: Dimensions.get("window").width/5.5,
    maxWidth: 300,
    maxHeight: 300,
    resizeMode: "cover",
    borderRadius: 500
  },

  titleItem: {
    fontSize: 14,
    marginLeft: 12,
    fontWeight: "600"
  },

  descItem: {
    fontSize: 12,
    marginLeft: 12
  },

  footerText: {
    padding: 15,
    alignItems: "center"
  }

});