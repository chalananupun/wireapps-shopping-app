import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import { useCartStore } from './services/cartStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CartIconWithBadge({ count, color }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Icon name="shopping-cart" size={24} color={color} /> 
      {count > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 16,
            height: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{count}</Text>
        </View>
      )}
    </View>
  );
}

function HomeTabs() {
  const { cart } = useCartStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Icon name="home" size={size} color={color} />;
          } else if (route.name === 'Cart') {
            return <CartIconWithBadge count={cart.length} color={color} />; // Pass color to CartIconWithBadge
          }
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={ProductListScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const { cart, addToCart, removeItem } = useCartStore();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
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
