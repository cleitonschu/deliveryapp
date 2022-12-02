import axios from 'axios';
import { BASE_URL, BASE_API } from "../../config.json";

const api = axios.create({
  baseURL: BASE_API
});

const getRestaurants = async (offset, limit) => {
  try {
    const response = await api.get(`/restaurants?offset=${offset}&limit=${limit}`);
    if(response){
      console.log(response.data);
      return response.data;
    } else {
      return {message: "Error on proccess request!", success: false};
    }
  } catch (error) {
    console.log(error);
    return {message: error.errmsg, success: false};
  }
}

const getRestaurant = async (restaurantID) => {
  try {
    const response = await api.get(`/restaurants/${restaurantID}`);
    if(response){
      console.log(response.data);
      return response.data;
    } else {
      return {message: "Error processing the request!", success: false};
    }
  } catch (error) {
    console.log(error);
    return {message: error.errmsg, success: false};
  }
}

export default {
  BASE_URL,
  getRestaurants,
  getRestaurant
};