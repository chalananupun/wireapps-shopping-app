import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './screens/HomeTabs';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import SplashScreen from './screens/SplashScreen';
import { useCartStore } from './services/cartStore';
import NetInfo from '@react-native-community/netinfo'; 
import { strings } from './utils/strings';

const Stack = createNativeStackNavigator();

export default function App() {
  const { cart, addToCart, removeItem } = useCartStore();
  const [isConnected, setIsConnected] = useState(true); 

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <SplashScreen message={strings.noInternetConnection} />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          initialParams={{ addToCart }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          initialParams={{ cart, removeItem }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
