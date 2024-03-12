import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ListingScreen from '../Screens/ListingScreen';
import AddFoodScreen from '../Screens/AddListingScreen';
import RecipeScreen from '../Screens/RecipeScreen';
import LeftHeader from '../Components/Header/LeftHeader';
import RightHeader from '../Components/Header/RightHeader';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListingScreenNavi from './ListingStackNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: '#BA0047' },
      headerStyle: {backgroundColor: '#BA0047'},
      headerTitleStyle: {color: 'white'},
      headerRight: () => <RightHeader />,
      headerLeft: () => <LeftHeader />,
      tabBarActiveTintColor: '#1fad7c',
        tabBarInactiveTintColor: '#f0f2f1',
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold'
        },
    }}  >
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size= {size} color= {color} />
          )
        }}
      />
      <Tab.Screen name="Food" component={ListingScreenNavi}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food" size= {size} color= {color} />
          )
        }}
      />
      <Tab.Screen name="Add" component={AddFoodScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size= {size} color= {color} />
          )
        }}
      />
      <Tab.Screen name="Recipes" component={RecipeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chef-hat" size= {size} color= {color} />
          )
        }}
      />
      <Tab.Screen name="Listing" component={RecipeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list" size= {size} color= {color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}