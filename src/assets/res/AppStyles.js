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
    // borderWidth: 0.5,
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
    // borderWidth: 1,
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
    backgroundColor:colors.BGScereen
  },


});
