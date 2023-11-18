import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Pressable } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import PoviderServiceListCard from '../../components/ProviderComponents/PoviderServiceListCard';
import { ScreenNames } from '../../../route/ScreenNames';
import 'react-native-get-random-values';
import strings from '../../assets/res/strings';
import ServiceProviderContext from '../../../store/ServiceProviderContext';

const ProviderCreateListing = props => {


  const { draftServices, setDraftID } = useContext(ServiceProviderContext)
  const language = strings.arabic.ProviderScreens.ProviderCreateListing



  const onStartPress = () => {

    setDraftID(null)

    props.navigation.navigate(ScreenNames.ProviderChooseService, {
      data: { ...props },
      isFromChooseServiceClick: true,
    });
  };


  const renderService = () => {
    const data = draftServices
    const cardsArray = data.map(draft => {
      return <PoviderServiceListCard body={draft} />;
    });
    return cardsArray.length < 1 ? noDrafts() : cardsArray
  };

  const noDrafts = () => {
    return (
      <View>
        <Text style={{ color: 'black', alignSelf: 'center', fontSize: 20 }}>
          there is no drafts currently
        </Text>
      </View>
    )
  }

  //   the head text
  const HeadText = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headText}>
          {language.HeadText}
        </Text>
      </View>
    );
  };

  //   seperator line
  const seperator = () => {
    return (
      <Text style={styles.line}>
        ____________________________________________________
      </Text>
    );
  };

  //   footer text component
  const footerText = () => {
    return (
      <Text style={styles.footerText}>
        {language.StartService}
      </Text>
    );
  };

  const onBackPress = () => {
    props.navigation.goBack();
  }


  //   create a new service component
  const newService = () => {
    return (
      <View style={styles.title}>
        <Pressable onPress={onBackPress}
        >
          <Ionicons
            style={styles.icon}
            name={"arrow-back"}
            color={"black"}
            size={25} />
        </Pressable>
        <TouchableOpacity
          onPress={() => onStartPress()}
        //activeOpacity={0.2} underlayColor={supmeted ? 'white' : 'gray'}
        >
          <AntDesign name="plussquareo" style={styles.plusSquare} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {newService()}
      {seperator()}
      <View style={styles.body}>
        {renderService()}
      </View>

      <View style={styles.footer}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: 40,
    marginBottom: 10,
  },
  body: {
    height: '40%',
    marginTop: 20,
  },
  footer: {
    //alignItems: 'flex-end',
    marginTop: 20,
  },

  headText: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  footerText: {
    fontSize: 18,
    color: 'black',
    marginRight: 30,
    marginBottom: 10,
  },
  footText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 130,
  },
  line: {
    textAlign: 'center',
    color: '#d3d3d3',
  },
  lessThan: { fontSize: 20, alignSelf: 'center', marginLeft: 30 },
  plusSquare: { fontSize: 30, alignSelf: 'center', marginRight: 30 },


  title: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },

});

export default ProviderCreateListing;
