import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import ProviderShowServDetailComp from '../../components/ProviderComponents/ProviderShowServDetailComp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import strings from '../../assets/res/strings';
import ServiceProviderContext from '../../../store/ServiceProviderContext';

const ProviderAddServiceDetail = props => {
  const [showModal, setShowModal] = useState(false);
  const [Dtitle, setDTitle] = useState('');
  const {additionalServices, setAdditionalServices} = useContext(
    ServiceProviderContext,
  );
  const language = strings.arabic.ProviderScreens.ProviderAddServiceDetail;

  let Did = uuidv4();

  const modalSavePress = () => {
    if (Dtitle.trim().length > 0 && doesntExists()) {
      const AddNewDetail = {
        detail_Id: Did,
        detailTitle: Dtitle,
      };
      setAdditionalServices([...additionalServices, AddNewDetail]);
      setDTitle('');
      setShowModal(false);
    }
  };
  const doesntExists = () => {
    let exists = additionalServices.findIndex(
      val => val?.detailTitle.toLowerCase() === Dtitle.toLowerCase(),
    );
    console.log("exists ", exists);
    return exists == -1 ? true : false;
  };
  const modalDeletePress = () => {
    setShowModal(false);
  };
  const onStartPress = () => {
    setShowModal(true);
  };
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const renderService = () => {
    const cardsArray = additionalServices.map(card => {
      return <ProviderShowServDetailComp {...card} />;
    });
    return cardsArray;
  };

  const RenderCreateButton = () => {
    return (
      <TouchableOpacity style={styles.AddButton} onPress={onStartPress}>
        <AntDesign
          name="plussquareo"
          style={{fontSize: 30, alignSelf: 'center', marginRight: 30}}
        />
        <Text style={styles.footText}>{language.CreateButton}</Text>
      </TouchableOpacity>
    );
  };

  const RenderModal = () => {
    return (
      <Modal
        transparent
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.detailModal}>
            {RenderHeaderText()}
            {RenderTitleBox()}
            {RenderButtons()}
          </View>
        </View>
      </Modal>
    );
  };
  const RenderHeaderText = () => {
    return (
      <View style={styles.Motitle}>
        <Text style={styles.text}>{language.Title}</Text>
      </View>
    );
  };
  const RenderTitleBox = () => {
    return (
      <View style={styles.body}>
        <TextInput
          style={styles.titleInput}
          keyboardType="default"
          maxLength={60}
          onChangeText={value => {
            setDTitle(value);
          }}
        />
      </View>
    );
  };
  const RenderButtons = () => {
    return (
      <View style={styles.Modalbtn}>
        {RenderCancelButton()}
        {RenderSaveButton()}
      </View>
    );
  };
  const RenderCancelButton = () => {
    return (
      <Pressable onPress={() => modalDeletePress()}>
        <Text style={styles.text}>{language.Cancel}</Text>
      </Pressable>
    );
  };
  const RenderSaveButton = () => {
    return (
      <Pressable onPress={() => modalSavePress()}>
        <Text style={styles.text}>{language.Save}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headText}>{language.Header}</Text>
      </View>
      <View style={styles.Mbody}>
        {RenderCreateButton()}
        <ScrollView contentContainerStyle={styles.home}>
          {renderService()}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.back} onPress={onBackPress}>
          <Text style={styles.backText}>{language.Back}</Text>
        </Pressable>
      </View>
      {RenderModal()}
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
  headText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  Mbody: {
    height: '75%',
    marginTop: 20,
    alignItems: 'center',
  },

  AddButton: {
    flexDirection: 'row-reverse',
    height: 60,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 25,
    marginBottom: 20,
  },
  footText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 130,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailModal: {
    width: '100%',
    height: 200,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  Motitle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  Modalbtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  titleInput: {
    textAlign: 'right',
    height: 50,
    width: 315,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#dcdcdc',
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
});

export default ProviderAddServiceDetail;
