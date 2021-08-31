/**
 * Sample React Native App
 *
 * adapted from App.js generated by the following command:
 *
 * react-native init example
 *
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Button, View} from 'react-native';
import {
  RNPaymentSDKLibrary,
  PaymentSDKConfiguration,
  PaymentSDKBillingDetails,
  PaymentSDKTheme,
  PaymentSDKConstants,
} from '@paytabs/react-native-paytabs';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    message: '--',
  };

  constructor(props) {
    super(props);
    this.state = {message: ''};
  }

  onPressPay() {
    let configuration = new PaymentSDKConfiguration();
    configuration.profileID = "*profile id*"
    configuration.serverKey= "*server key*"
    configuration.clientKey = "*client key*"
    configuration.cartID = "545454"
    configuration.currency = "AED"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "ae"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.screenTitle = "Pay with Card"

    let billingDetails = new PaymentSDKBillingDetails(name= "Jone Smith",
                                  email= "email@domain.com",
                                  phone= "97311111111",
                                  addressLine= "Flat 1,Building 123, Road 2345",
                                  city= "Dubai",
                                  state= "Dubai",
                                  countryCode= "AE",
                                  zip= "1234")
    configuration.billingDetails = billingDetails
    configuration.languageCode = "ar"
    let theme = new PaymentSDKTheme()
    //Prepare the resolved Image
    // -
    const merchantLogo = require('./Logo.png');
    const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
    const resolvedMerchantLogo = resolveAssetSource(merchantLogo);
    theme.merchantLogo = resolvedMerchantLogo
    //-
    // theme.backgroundColor = "a83297"
    configuration.theme = theme
    
    

    RNPaymentSDKLibrary.startCardPayment(JSON.stringify(configuration)).then( result => {
      if(result["PaymentDetails"] != null) {
        let paymentDetails = result["PaymentDetails"]
        console.log(paymentDetails)
      } else if(result["Event"] == "CancelPayment") {
        console.log("Cancel Payment Event")
      } 
     }, function(error) {
      console.log(error)
     });
  }

  onPressApplePay() {
    let configuration = new PaymentSDKConfiguration();
    configuration.profileID = '*profile id*'
    configuration.serverKey = '*server key*'
    configuration.clientKey = '*client key*'
    configuration.cartID = '545454'
    configuration.currency = 'AED'
    configuration.cartDescription = 'Flowers'
    configuration.merchantCountryCode = 'ae'
    configuration.merchantName = 'Sand Box'
    configuration.amount = 20;
    configuration.merchantIdentifier = 'merchant.com.bundleid'

    RNPaymentSDKLibrary.startApplePayPayment(
      JSON.stringify(configuration),
    ).then(
      (result) => {
        if (result.PaymentDetails != null) {
          let paymentDetails = result.PaymentDetails
          console.log(paymentDetails);
        } else if (result.Event == 'CancelPayment') {
          console.log('Cancel Payment Event');
        }
     }, function(error) {
        console.log(error);
      },
    );
  }

  onPressSTCPay() {
    let configuration = new PaymentSDKConfiguration();
    configuration.profileID = '*profile id*'
    configuration.serverKey = '*server key*'
    configuration.clientKey = '*client key*'
    configuration.cartID = '545454'
    configuration.currency = 'SAR'
    configuration.cartDescription = 'Flowers'
    configuration.merchantCountryCode = 'SA'
    configuration.amount = 20;
    configuration.alternativePaymentMethods = [
      PaymentSDKConstants.AlternativePaymentMethod.stcPay,
    ];

    let billingDetails = new PaymentSDKBillingDetails(
      (name = 'Jone Smith'),
      (email = 'email@domain.com'),
      (phone = '966111111111'),
      (addressLine = 'Flat 1,Building 123, Road 2345'),
      (city = 'Riyadh'),
      (state = 'Riyadh'),
      (countryCode = 'SA'),
      (zip = '1234'),
    );
    configuration.billingDetails = billingDetails;

    RNPaymentSDKLibrary.startAlternativePaymentMethod(
      JSON.stringify(configuration),
    ).then(
      (result) => {
        if (result['PaymentDetails'] != null) {
          let paymentDetails = result['PaymentDetails'];
          console.log(paymentDetails);
        } else if (result['Event'] == 'CancelPayment') {
          console.log('Cancel Payment Event');
        }
      },
      function (error) {
        console.log(error);
      },

  );}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Paytabs Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>{this.state.message}</Text>
        <Button onPress={this.onPressPay} title="Pay with Card" color="#c00" />
        <View style={{height: 20}}></View>
        <Button
          onPress={this.onPressApplePay}
          title="Pay with Apple Pay"
          color="#c00"
          disabled={Platform.OS != 'ios'}
        />
        <View style={{height: 20}}></View>
        <Button
          onPress={this.onPressSTCPay}
          title="Pay with STC Pay"
          color="#c00"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
