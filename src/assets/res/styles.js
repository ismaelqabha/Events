import { StyleSheet } from "react-native";
import { colors } from "../AppColors";

// to be figured out
export const styles = StyleSheet.create({
  ProviderScreensStyles: {
    HeaderCompStyle: {
      header: {
        marginRight: 30,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
      },
      noBackArrowHeader: {
        marginRight: 30,
        marginTop: 20,
        paddingHorizontal: '5%',
      },
      headText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        alignSelf: 'flex-end'
      },
    },
    ProviderAddInfoStyles: {
      ScrollView: {
        width: '100%',
      },
      header: {
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
      },
      headText: {
        fontSize: 20,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
      },
      body: {
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      borderTitleView: {
        height: 560,
        width: 340,
        borderWidth: 1,
        borderColor: colors.darkGold,
        borderRadius: 20,
        marginBottom: 30,
        marginTop: 5,
        alignItems: 'center',
        backgroundColor: 'white',
      },
      borderAddressView: {
        height: 250,
        width: 340,
        borderWidth: 1,
        borderColor: colors.darkGold,
        borderRadius: 15,
        marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'white',
      },
      footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        marginLeft: 20,
        alignSelf: 'flex-end',
      },

      dropdown: {
        height: 50,
        width: 300,
        fontSize: 17,
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 30,
      },
      dropstyle: {
        textAlign: 'center',
        color:  colors.darkGold,
        fontWeight: 'bold',
        fontSize: 15,
      },
      droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.darkGold,
      },
      input: {
        textAlign: 'center',
        height: 50,
        width: '90%',
        fontSize: 16,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#dcdcdc',
        marginTop: 30,
        marginBottom: 30,
      },
      text: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        marginRight: 20,
        color:  colors.darkGold,
        fontWeight:'500'
      },
      titleInput: {
        textAlign: 'auto',
        height: 50,
        width: 315,
        borderWidth: 1.5,
        borderRadius: 15,
        borderColor: "darkgray",
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
      },
      subtitleInput: {
        textAlign: 'auto',
        height: 100,
        width: 315,
        borderWidth: 1.5,
        borderRadius: 15,
        borderColor: "darkgray",
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
      },
      descInput: {
        textAlign: 'auto',
        height: 150,
        width: 315,
        borderWidth: 1.5,
        borderRadius: 15,
        borderColor: "darkgray",
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
      },
      textRequired: {
        textAlign: 'auto',
        fontSize: 14,
        marginRight: 20,
        color: 'red',
      },
    },
    ProviderChooseServiceStyles:{
      header: {
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: 40,
        marginBottom: 10,
      },
      headText: {
        fontSize: 20,
        color: colors.TitleFont,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        fontWeight: 'bold'
      },
      body: {
        height: '60%',
        width: '95%',
        marginTop: 20,
        alignSelf: 'center',
        padding: 10,
        borderRadius: 12,
        borderWidth: 0.5
      },
      footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        paddingHorizontal: '10%'
      },
    
    }
  },
  back: {
    width: 70,
    height: 40,
    backgroundColor: "black",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  backText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.silver
  },
  next: {
    width: 100,
    height: 40,
    backgroundColor: colors.puprble,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.darkGold
  },
  nextText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.darkGold
  },
  shadow: {
    shadowColor: colors.gold,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 7,
  },
  container: {
    flex: 1
  },
});
