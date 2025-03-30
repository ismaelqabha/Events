// storage/storageFunctions.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to set an item in AsyncStorage
export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting item to AsyncStorage:', error);
    }
};

// Function to get an item from AsyncStorage
export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting item from AsyncStorage:', error);
        return null;
    }
};

// Function to remove an item from AsyncStorage
export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing item from AsyncStorage:', error);
    }
};

// Function to clear all items from AsyncStorage
export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
    }
};
