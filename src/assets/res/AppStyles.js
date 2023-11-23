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
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10
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


});
