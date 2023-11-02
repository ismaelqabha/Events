import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProviderBookingRequest = (props) => {
    const { fulDate } = props.route?.params || {}

  
  return (
    <View>
      <Text>Date: {fulDate}</Text>
    </View>
  )
}

export default ProviderBookingRequest

const styles = StyleSheet.create({})