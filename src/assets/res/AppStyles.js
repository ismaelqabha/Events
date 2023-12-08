import { StyleSheet } from "react-native";
import { colors } from "../AppColors";

// to be figured out
export const AppStyles = StyleSheet.create({

  back: {
    width: 120,
    height: 35,
    backgroundColor: colors.silver,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: colors.darkGold
  },
  backText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "black"
  },
  next: {
    width: 120,
    height: 35,
    backgroundColor: colors.puprble,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: colors.darkGold
  },
  nextText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.darkGold
  },
  shadow: {
    shadowColor: "gray",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 7,
  },
  container: {
    flex: 1,
    backgroundColor: colors.BGScereen
  },
  createUserfooter: {
    paddingVertical: 30,
    marginRight: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: -300,
    borderWidth: 1
  },
  footerPart:{
    width: '94%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  signUpFooter: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 10,
    padding: 15,
    backgroundColor: colors.BGScereen
},
  createUserBack: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createUserNext: {
    alignSelf: 'flex-end',
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.puprble,
    margin: 3,
    elevation: 5,
    borderRadius: 8,
    marginRight: 20
  },
  createUserBackTxt: {
    fontSize: 18,
  },
  createUserNextTxt: {
    fontSize: 18,
    color: colors.darkGold
  },
  createuserDots: {
    flexDirection:'row',
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 20
  },
  dots:{
    width: 7,
    height: 7,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.gold,
    elevation: 5
  },
  pressDot:{
    width: 7,
    height: 7,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.puprble,
    elevation: 5
  },

});
