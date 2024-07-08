import { StyleSheet, Text, View, Pressable, ScrollView, Image, Modal, TextInput, ToastAndroid, Animated } from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import UsersContext from '../../../store/UsersContext';
import { colors } from '../../assets/AppColors';
import { ScreenNames } from '../../../route/ScreenNames';
import { searchUsersAPI } from '../../resources/API';
import { showMessage } from '../../resources/Functions';
import { ActivityIndicator } from 'react-native-paper';

const ClientRelations = (props) => {
  const { userId } = useContext(UsersContext);
  const [searched, setSearched] = useState('')
  const [searchResults, setSearchResults] = useState([]);
  const slideInAnimation = useRef(new Animated.Value(0)).current;
  const { relations, loading } = props.route.params || []


  const searchUsers = async (query) => {
    try {
      const friendIds = relations.map((relation) => relation.userInfo._id);
      friendIds.push(userId)
      const response = await searchUsersAPI({ query, excludeIds: friendIds });
      if (response) {
        if (response && response.message) {
          setSearchResults([])
        } else {
          setSearchResults(response)
        }
      } else {
        setSearchResults([])
      }
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleSearch = (value) => {
    setSearched(value);
    if (value.trim()) {
      searchUsers(value.trim());
    } else {
      setSearchResults([]);
    }
    // Reset animation state
    slideInAnimation.setValue(0);
  };

  const onBackHandler = () => {
    props.navigation.goBack();
  }

  const header = () => {
    return (
      <View style={styles.header}>
        <Pressable onPress={onBackHandler}>
          <AntDesign style={styles.icon} name={"left"} color={"black"} size={20} />
        </Pressable>
        <Text style={styles.headerTxt}>قائمة العلاقات</Text>
      </View>
    )
  }

  const searchBar = () => {
    return (
      <View style={styles.searchbar}>
        <TextInput
          style={styles.searchinput}
          keyboardType="default"
          placeholder='بحث العلاقات'
          value={searched}
          onChangeText={handleSearch}
        />
        <AntDesign style={styles.icon} name={"search1"} color={colors.silver} size={25} />
      </View>
    )
  }

  const RelationComp = ({ user, index = 0 }) => {
    const translateX = slideInAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    useEffect(() => {
      Animated.timing(slideInAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View key={index} style={{ ...styles.item, opacity: slideInAnimation, transform: [{ translateX }] }}>
        <Pressable onPress={() => goToProfile(user?.userInfo)}>
          <Text style={styles.basicInfo}>{user?.userInfo?.User_name}</Text>
          <Text style={styles.basicInfoTitle}>{user?.userInfo?.relationshipType}</Text>
        </Pressable>
        <Image source={{ uri: user.userInfo?.UserPhoto }} style={styles.ImageView} />
      </Animated.View>
    )
  }

  const goToProfile = (user) => {
    props.navigation.navigate(ScreenNames.UserProfile, { data: user })
  }

  const allRelations = () => {
    if (searched.trim().length > 0) {
      const filteredFriends = relations.filter(user => user.userInfo.User_name.toLowerCase().includes(searched.toLowerCase()));
      const searchResultsCount = searchResults.length;
      const filteredFriendsCount = filteredFriends.length;

      if (filteredFriendsCount === 0 && searchResultsCount === 0) {
        return (
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.relationLabelText}>لا يوجد نتائج </Text>
          </View>
        );
      }

      return (
        <View>
          {filteredFriendsCount > 0 && (
            <View>
              <View style={styles.relationLabelView}>
                <Text style={styles.relationLabelText}>علاقاتي</Text>
              </View>
              {friends(filteredFriends, true)}
            </View>
          )}
          {searchResultsCount > 0 && (
            <View>
              <View style={styles.relationLabelView}>
                <Text style={styles.relationLabelText}>علاقات جديدة</Text>
              </View>
              {friends(searchResults)}
            </View>
          )
          }
        </View >
      );
    } else {
      return relations && relations.length > 0 ? friends(relations, false) : noFriends();
    }
  };

  const friends = (relations, isSearch = false) => {
    if (relations && Array.isArray(relations)) {
      if (relations.length > 0) {
        const relationJSX = relations.map((user, index) => {
          return <RelationComp user={user} index={index} />;
        });
        return relationJSX;
      }
    }
  };

  const noFriends = () => {
    return (
      <View style={{ alignSelf: "center" }}>
        <Text style={styles.relationLabelText}>لا يوجد علاقات قائمة حاليا</Text>
        <Text style={styles.relationLabelText}>ابحث عن علاقات جديدة</Text>
      </View>
    );
  };


  const renderRelation = () => {
    return (
      <View style={{ width: '100%', alignSelf: 'center' }}>
        {loading && <ActivityIndicator style={{ alignSelf: 'center', marginTop: '50%' }} size={50} />}
        {!loading && allRelations()}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {header()}
      {searchBar()}
      <ScrollView>
        {renderRelation()}
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  )
}

export default ClientRelations

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  headerTxt: {
    fontSize: 18,
    color: colors.puprble,
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  searchbar: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.silver,
    height: 50,
    width: '90%',
    borderRadius: 8,
    paddingRight: 10
  },
  searchinput: {
    alignContent: 'center',
    width: 250,
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center'
  },

  basicInfo: {
    fontSize: 18,
    color: colors.puprble,
    fontWeight: 'bold'
  },
  basicInfoTitle: {
    fontSize: 12,
    textAlign: 'right'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
  },
  ImageView: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 30,
    marginLeft: 15
  },
  relationLabelView: {
    height: 40,
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: colors.gold,
    paddingRight: 10,
    width: '98%',
    alignSelf: 'center'
  },
  relationLabelText: {
    fontSize: 18,
    color: colors.puprble,
    fontWeight: 'bold'
  }

})
