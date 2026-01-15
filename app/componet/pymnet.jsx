// // // // // // // import { useRoute } from '@react-navigation/native';
// // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// // // // // // // import RazorpayCheckout from 'react-native-razorpay';

// // // // // // // export default function PaymentScreen() {
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // const route = useRoute();
// // // // // // // const username = route?.params?.username || '';



// // // // // // // //   useEffect(() => {
// // // // // // // // Alert.alert(JSON.stringify(username))
// // // // // // // //   }, [])


// // // // // // //   const payNow = async () => {
// // // // // // //     setLoading(true);

// // // // // // //     try {
// // // // // // //       // ✅ Backend से Order create करो
// // // // // // //       const res = await fetch('http://172.26.98.92:4000/pyment/order', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify({ amount: 5 }), // Rs 500
// // // // // // //       });

// // // // // // //       const order = await res.json();
// // // // // // //       console.log('Order:', order);

// // // // // // //       // ✅ Razorpay Options
// // // // // // //       const options = {
// // // // // // //         description: 'Demo Payment',
// // // // // // //         image: 'https://yourapp.com/logo.png',
// // // // // // //         currency: 'INR',
// // // // // // //         key: 'rzp_test_6uJbkhUuEgNohr', // Razorpay Dashboard से
// // // // // // //         amount: order.amount, // paise में
// // // // // // //         order_id: order.id,
// // // // // // //         name: 'My App',
// // // // // // //         prefill: {
// // // // // // //           email: 'test@example.com',
// // // // // // //           contact: '9569415328',
// // // // // // //           name: 'sahilindia'
// // // // // // //         },
// // // // // // //         theme: { color: '#53a20e' },
// // // // // // //       };

// // // // // // //       RazorpayCheckout.open(options)
// // // // // // //         .then((paymentData) => {
// // // // // // //           // ✅ Payment success — server को verify request भेजो
// // // // // // //           console.log('Payment Success:', paymentData);

// // // // // // //           fetch('http://172.26.98.92:4000/pyment/verify', {
// // // // // // //             method: 'POST',
// // // // // // //             headers: { 'Content-Type': 'application/json' },
// // // // // // //             body: JSON.stringify({
// // // // // // //               razorpay_order_id: paymentData.razorpay_order_id,
// // // // // // //               razorpay_payment_id: paymentData.razorpay_payment_id,
// // // // // // //               razorpay_signature: paymentData.razorpay_signature,
// // // // // // //             }),
// // // // // // //           })
// // // // // // //             .then(res => res.json())
// // // // // // //             .then(data => {
// // // // // // //               console.log(data);
// // // // // // //               Alert.alert('Payment Verified ✅', JSON.stringify(data));
// // // // // // //             })
// // // // // // //             .catch(err => {
// // // // // // //               console.error(err);
// // // // // // //               Alert.alert('Verification Failed', 'Something went wrong');
// // // // // // //             });

// // // // // // //         })
// // // // // // //         .catch((error) => {
// // // // // // //           console.log('Payment Failed:', error);
// // // // // // //           Alert.alert('Payment Failed', `Error: ${error.description}`);
// // // // // // //         });

// // // // // // //     } catch (err) {
// // // // // // //       console.log(err);
// // // // // // //       Alert.alert('Error', 'Something went wrong');
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <View style={styles.container}>
// // // // // // //       <Text style={styles.title}>Razorpay Payment {username}</Text>
// // // // // // //       <TouchableOpacity style={styles.button} onPress={payNow} disabled={loading}>
// // // // // // //         {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Pay Now</Text>}
// // // // // // //       </TouchableOpacity>
// // // // // // //     </View>
// // // // // // //   );
// // // // // // // }

// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// // // // // // //   title: { fontSize: 24, marginBottom: 30 },
// // // // // // //   button: { backgroundColor: '#53a20e', padding: 16, borderRadius: 8 },
// // // // // // //   buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// // // // // // // });































// // // // // // // import { useRoute } from '@react-navigation/native';
// // // // // // // import React, { useState } from 'react';
// // // // // // // import {
// // // // // // //   View,
// // // // // // //   Text,
// // // // // // //   TouchableOpacity,
// // // // // // //   StyleSheet,
// // // // // // //   Alert,
// // // // // // //   ActivityIndicator,
// // // // // // // } from 'react-native';
// // // // // // // import RazorpayCheckout from 'react-native-razorpay';
// // // // // // // import LinearGradient from 'react-native-linear-gradient'; // ✅ npm i react-native-linear-gradient

// // // // // // // export default function PaymentScreen() {
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   const route = useRoute();
// // // // // // //   const username = route?.params?.username || '';

// // // // // // //   const payNow = async () => {
// // // // // // //     setLoading(true);

// // // // // // //     try {
// // // // // // //       const res = await fetch('http://172.26.98.92:4000/pyment/order', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify({ amount: 5 }), // Rs 500
// // // // // // //       });

// // // // // // //       const order = await res.json();
// // // // // // //       console.log('Order:', order);

// // // // // // //       const options = {
// // // // // // //         description: 'Demo Payment',
// // // // // // //         image: 'https://yourapp.com/logo.png',
// // // // // // //         currency: 'INR',
// // // // // // //         key: 'rzp_test_6uJbkhUuEgNohr',
// // // // // // //         amount: order.amount,
// // // // // // //         order_id: order.id,
// // // // // // //         name: 'My App',
// // // // // // //         prefill: {
// // // // // // //           email: 'test@example.com',
// // // // // // //           contact: '9569415328',
// // // // // // //           name: username,
// // // // // // //         },
// // // // // // //         theme: { color: '#4facfe' },
// // // // // // //       };

// // // // // // //       RazorpayCheckout.open(options)
// // // // // // //         .then(paymentData => {
// // // // // // //           console.log('Payment Success:', paymentData);

// // // // // // //           fetch('http://172.26.98.92:4000/pyment/verify', {
// // // // // // //             method: 'POST',
// // // // // // //             headers: { 'Content-Type': 'application/json' },
// // // // // // //             body: JSON.stringify({
// // // // // // //               razorpay_order_id: paymentData.razorpay_order_id,
// // // // // // //               razorpay_payment_id: paymentData.razorpay_payment_id,
// // // // // // //               razorpay_signature: paymentData.razorpay_signature,
// // // // // // //               username:username
// // // // // // //             }),
// // // // // // //           })
// // // // // // //             .then(res => res.json())
// // // // // // //             .then(data => {
// // // // // // //               console.log(data);
// // // // // // //               Alert.alert('✅ Payment Verified', JSON.stringify(data));
// // // // // // //             })
// // // // // // //             .catch(err => {
// // // // // // //               console.error(err);
// // // // // // //               Alert.alert('❌ Verification Failed', 'Something went wrong');
// // // // // // //             });
// // // // // // //         })
// // // // // // //         .catch(error => {
// // // // // // //           console.log('Payment Failed:', error);
// // // // // // //           Alert.alert('❌ Payment Failed', `Error: ${error.description}`);
// // // // // // //         });
// // // // // // //     } catch (err) {
// // // // // // //       console.log(err);
// // // // // // //       Alert.alert('❌ Error', 'Something went wrong');
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <LinearGradient
// // // // // // //       colors={['#4facfe', '#00f2fe']}
// // // // // // //       style={styles.container}
// // // // // // //     >
// // // // // // //       <View style={styles.card}>
// // // // // // //         <Text style={styles.title}>Hello, {username}</Text>
// // // // // // //         <Text style={styles.subtitle}>Complete your payment securely</Text>

// // // // // // //         <TouchableOpacity
// // // // // // //           style={styles.button}
// // // // // // //           onPress={payNow}
// // // // // // //           disabled={loading}
// // // // // // //         >
// // // // // // //           {loading ? (
// // // // // // //             <ActivityIndicator color="#fff" />
// // // // // // //           ) : (
// // // // // // //             <Text style={styles.buttonText}>Pay Now</Text>
// // // // // // //           )}
// // // // // // //         </TouchableOpacity>
// // // // // // //       </View>
// // // // // // //     </LinearGradient>
// // // // // // //   );
// // // // // // // }

// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: {
// // // // // // //     flex: 1,
// // // // // // //     justifyContent: 'center',
// // // // // // //     alignItems: 'center',
// // // // // // //   },
// // // // // // //   card: {
// // // // // // //     backgroundColor: '#fff',
// // // // // // //     borderRadius: 16,
// // // // // // //     padding: 30,
// // // // // // //     alignItems: 'center',
// // // // // // //     width: '80%',
// // // // // // //     elevation: 5,
// // // // // // //     shadowColor: '#000',
// // // // // // //     shadowOpacity: 0.2,
// // // // // // //     shadowOffset: { width: 0, height: 4 },
// // // // // // //     shadowRadius: 8,
// // // // // // //   },
// // // // // // //   title: {
// // // // // // //     fontSize: 24,
// // // // // // //     fontWeight: '700',
// // // // // // //     marginBottom: 10,
// // // // // // //     color: '#333',
// // // // // // //   },
// // // // // // //   subtitle: {
// // // // // // //     fontSize: 16,
// // // // // // //     color: '#555',
// // // // // // //     marginBottom: 30,
// // // // // // //     textAlign: 'center',
// // // // // // //   },
// // // // // // //   button: {
// // // // // // //     backgroundColor: '#4facfe',
// // // // // // //     paddingVertical: 14,
// // // // // // //     paddingHorizontal: 40,
// // // // // // //     borderRadius: 30,
// // // // // // //   },
// // // // // // //   buttonText: {
// // // // // // //     color: '#fff',
// // // // // // //     fontSize: 17,
// // // // // // //     fontWeight: '700',
// // // // // // //   },
// // // // // // // });















// // // // // // // import { useRoute } from '@react-navigation/native';
// // // // // // // import React, { useState } from 'react';
// // // // // // // import {
// // // // // // //   View,
// // // // // // //   Text,
// // // // // // //   TouchableOpacity,
// // // // // // //   StyleSheet,
// // // // // // //   Alert,
// // // // // // //   ActivityIndicator,
// // // // // // // } from 'react-native';
// // // // // // // import RazorpayCheckout from 'react-native-razorpay';
// // // // // // // import LinearGradient from 'react-native-linear-gradient';

// // // // // // // export default function PaymentScreen() {
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   const route = useRoute();
// // // // // // //   const username = route?.params?.username || '';

// // // // // // //   const payNow = async () => {
// // // // // // //     setLoading(true);

// // // // // // //     try {
// // // // // // //       const res = await fetch('http://172.26.98.92:4000/pyment/order', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify({ amount: 10 }), // ✅ ₹10 only
// // // // // // //       });

// // // // // // //       const order = await res.json();
// // // // // // //       console.log('Order:', order);

// // // // // // //       const options = {
// // // // // // //         description: 'Premium Membership',
// // // // // // //         image: 'https://yourapp.com/logo.png',
// // // // // // //         currency: 'INR',
// // // // // // //         key: 'rzp_test_6uJbkhUuEgNohr',
// // // // // // //         amount: order.amount,
// // // // // // //         order_id: order.id,
// // // // // // //         name: 'My App Premium',
// // // // // // //         prefill: {
// // // // // // //           email: 'test@example.com',
// // // // // // //           contact: '9999999999',
// // // // // // //           name: username,
// // // // // // //         },
// // // // // // //         theme: { color: '#FF6F61' },
// // // // // // //       };

// // // // // // //       RazorpayCheckout.open(options)
// // // // // // //         .then(paymentData => {
// // // // // // //           console.log('Payment Success:', paymentData);

// // // // // // //           fetch('http://172.26.98.92:4000/pyment/verify', {
// // // // // // //             method: 'POST',
// // // // // // //             headers: { 'Content-Type': 'application/json' },
// // // // // // //             body: JSON.stringify({
// // // // // // //               razorpay_order_id: paymentData.razorpay_order_id,
// // // // // // //               razorpay_payment_id: paymentData.razorpay_payment_id,
// // // // // // //               razorpay_signature: paymentData.razorpay_signature,
// // // // // // //               username: username,
// // // // // // //             }),
// // // // // // //           })
// // // // // // //             .then(res => res.json())
// // // // // // //             .then(data => {
// // // // // // //               console.log(data);
// // // // // // //               Alert.alert('✅ Premium Activated!', `Valid till: ${data.premiumUntil}`);
// // // // // // //             })
// // // // // // //             .catch(err => {
// // // // // // //               console.error(err);
// // // // // // //               Alert.alert('❌ Verification Failed', 'Something went wrong');
// // // // // // //             });
// // // // // // //         })
// // // // // // //         .catch(error => {
// // // // // // //           console.log('Payment Failed:', error);
// // // // // // //           Alert.alert('❌ Payment Cancelled', error.description || 'User cancelled');
// // // // // // //         });
// // // // // // //     } catch (err) {
// // // // // // //       console.log(err);
// // // // // // //       Alert.alert('❌ Error', 'Something went wrong');
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <LinearGradient colors={['#FF6F61', '#DE4313']} style={styles.container}>
// // // // // // //       <View style={styles.card}>
// // // // // // //         <Text style={styles.offerTag}>🔥 Limited Offer</Text>
// // // // // // //         <Text style={styles.title}>Unlock Premium</Text>
// // // // // // //         <Text style={styles.price}>₹10 Only</Text>
// // // // // // //         <Text style={styles.subtitle}>
// // // // // // //           Enjoy all premium features for 1 month.
// // // // // // //         </Text>

// // // // // // //         <TouchableOpacity
// // // // // // //           style={styles.button}
// // // // // // //           onPress={payNow}
// // // // // // //           disabled={loading}
// // // // // // //         >
// // // // // // //           {loading ? (
// // // // // // //             <ActivityIndicator color="#fff" />
// // // // // // //           ) : (
// // // // // // //             <Text style={styles.buttonText}>Pay Now</Text>
// // // // // // //           )}
// // // // // // //         </TouchableOpacity>

// // // // // // //         <Text style={styles.username}>Paying as: {username}</Text>
// // // // // // //       </View>
// // // // // // //     </LinearGradient>
// // // // // // //   );
// // // // // // // }

// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// // // // // // //   card: {
// // // // // // //     backgroundColor: '#fff',
// // // // // // //     borderRadius: 20,
// // // // // // //     padding: 30,
// // // // // // //     alignItems: 'center',
// // // // // // //     width: '85%',
// // // // // // //     elevation: 6,
// // // // // // //   },
// // // // // // //   offerTag: {
// // // // // // //     backgroundColor: '#FF6F61',
// // // // // // //     color: '#fff',
// // // // // // //     paddingVertical: 4,
// // // // // // //     paddingHorizontal: 12,
// // // // // // //     borderRadius: 20,
// // // // // // //     fontWeight: 'bold',
// // // // // // //     marginBottom: 12,
// // // // // // //     fontSize: 12,
// // // // // // //   },
// // // // // // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 5, color: '#333' },
// // // // // // //   price: {
// // // // // // //     fontSize: 28,
// // // // // // //     fontWeight: 'bold',
// // // // // // //     color: '#DE4313',
// // // // // // //     marginBottom: 10,
// // // // // // //   },
// // // // // // //   subtitle: {
// // // // // // //     fontSize: 15,
// // // // // // //     color: '#555',
// // // // // // //     marginBottom: 25,
// // // // // // //     textAlign: 'center',
// // // // // // //     lineHeight: 22,
// // // // // // //   },
// // // // // // //   button: {
// // // // // // //     backgroundColor: '#FF6F61',
// // // // // // //     paddingVertical: 14,
// // // // // // //     paddingHorizontal: 50,
// // // // // // //     borderRadius: 50,
// // // // // // //     marginBottom: 15,
// // // // // // //   },
// // // // // // //   buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
// // // // // // //   username: { fontSize: 13, color: '#999' },
// // // // // // // });





















// // // // // // import { useRoute, useNavigation } from '@react-navigation/native';
// // // // // // import React, { useState, useContext } from 'react';
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   TouchableOpacity,
// // // // // //   StyleSheet,
// // // // // //   Alert,
// // // // // //   ActivityIndicator,
// // // // // // } from 'react-native';
// // // // // // import RazorpayCheckout from 'react-native-razorpay';
// // // // // // import LinearGradient from 'react-native-linear-gradient';
// // // // // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // // // // import { ChatContext } from '../component/contexapi.jsx'; // ✅ Apna context import karo

// // // // // // export default function PaymentScreen() {
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   const route = useRoute();
// // // // // //   const navigation = useNavigation();
// // // // // //   const username = route?.params?.username || '';

// // // // // //   const { updatePremium } = useContext(ChatContext); // ✅ Context se updatePremium lo

// // // // // //   const payNow = async () => {
// // // // // //     setLoading(true);

// // // // // //     try {
// // // // // //       const res = await fetch('http://172.26.98.92:4000/pyment/order', {
// // // // // //         method: 'POST',
// // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // //         body: JSON.stringify({ amount: 1 }), // ✅ ₹10 only
// // // // // //       });

// // // // // //       const order = await res.json();
// // // // // //       console.log('Order:', order);

// // // // // //       const options = {
// // // // // //         description: 'Premium Membership',
// // // // // //         image: 'https://yourapp.com/logo.png',
// // // // // //         currency: 'INR',
// // // // // //         key: 'rzp_live_oAJE17BlSQtzuY',
// // // // // //         amount: order.amount,
// // // // // //         order_id: order.id,
// // // // // //         name: 'My App Premium',
// // // // // //         prefill: {
// // // // // //           email: 'test@example.com',
// // // // // //           contact: '9999999999',
// // // // // //           name: username,
// // // // // //         },
// // // // // //         theme: { color: '#FF6F61' },
// // // // // //       };

// // // // // //       RazorpayCheckout.open(options)
// // // // // //         .then(async paymentData => {
// // // // // //           console.log('Payment Success:', paymentData);

// // // // // //           const verify = await fetch('http://172.26.98.92:4000/pyment/verify', {
// // // // // //             method: 'POST',
// // // // // //             headers: { 'Content-Type': 'application/json' },
// // // // // //             body: JSON.stringify({
// // // // // //               razorpay_order_id: paymentData.razorpay_order_id,
// // // // // //               razorpay_payment_id: paymentData.razorpay_payment_id,
// // // // // //               razorpay_signature: paymentData.razorpay_signature,
// // // // // //               username: username,
// // // // // //             }),
// // // // // //           });

// // // // // //           const data = await verify.json();
// // // // // //           console.log(data);

// // // // // //           // ✅ Premium state AsyncStorage me bhi save karo
// // // // // //           await AsyncStorage.setItem('isPremium', 'true');
// // // // // //           await AsyncStorage.setItem('premiumExpiry', data.premiumUntil);

// // // // // //           // ✅ Context bhi update karo
// // // // // //           updatePremium(true);

// // // // // //           Alert.alert('✅ Premium Activated!', `Valid till: ${data.premiumUntil}`);

// // // // // //           // ✅ App me wapas bhejo ya refresh karo
// // // // // //           navigation.reset({ index: 0, routes: [{ name: 'ChatList' }] });

// // // // // //         })
// // // // // //         .catch(error => {
// // // // // //           console.log('Payment Failed:', error);
// // // // // //           Alert.alert('❌ Payment Cancelled', error.description || 'User cancelled');
// // // // // //         });
// // // // // //     } catch (err) {
// // // // // //       console.log(err);
// // // // // //       Alert.alert('❌ Error', 'Something went wrong');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <LinearGradient colors={['#FF6F61', '#DE4313']} style={styles.container}>
// // // // // //       <View style={styles.card}>
// // // // // //         <Text style={styles.offerTag}>🔥 Limited Offer</Text>
// // // // // //         <Text style={styles.title}>Unlock Premium</Text>
// // // // // //         <Text style={styles.price}>₹10 Only</Text>
// // // // // //         <Text style={styles.subtitle}>
// // // // // //           Enjoy all premium features for 1 month.
// // // // // //         </Text>

// // // // // //         <TouchableOpacity
// // // // // //           style={styles.button}
// // // // // //           onPress={payNow}
// // // // // //           disabled={loading}
// // // // // //         >
// // // // // //           {loading ? (
// // // // // //             <ActivityIndicator color="#fff" />
// // // // // //           ) : (
// // // // // //             <Text style={styles.buttonText}>Pay Now</Text>
// // // // // //           )}
// // // // // //         </TouchableOpacity>

// // // // // //         <Text style={styles.username}>Paying as: {username}</Text>
// // // // // //       </View>
// // // // // //     </LinearGradient>
// // // // // //   );
// // // // // // }

// // // // // // const styles = StyleSheet.create({
// // // // // //   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// // // // // //   card: {
// // // // // //     backgroundColor: '#fff',
// // // // // //     borderRadius: 20,
// // // // // //     padding: 30,
// // // // // //     alignItems: 'center',
// // // // // //     width: '85%',
// // // // // //     elevation: 6,
// // // // // //   },
// // // // // //   offerTag: {
// // // // // //     backgroundColor: '#FF6F61',
// // // // // //     color: '#fff',
// // // // // //     paddingVertical: 4,
// // // // // //     paddingHorizontal: 12,
// // // // // //     borderRadius: 20,
// // // // // //     fontWeight: 'bold',
// // // // // //     marginBottom: 12,
// // // // // //     fontSize: 12,
// // // // // //   },
// // // // // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 5, color: '#333' },
// // // // // //   price: {
// // // // // //     fontSize: 28,
// // // // // //     fontWeight: 'bold',
// // // // // //     color: '#DE4313',
// // // // // //     marginBottom: 10,
// // // // // //   },
// // // // // //   subtitle: {
// // // // // //     fontSize: 15,
// // // // // //     color: '#555',
// // // // // //     marginBottom: 25,
// // // // // //     textAlign: 'center',
// // // // // //     lineHeight: 22,
// // // // // //   },
// // // // // //   button: {
// // // // // //     backgroundColor: '#FF6F61',
// // // // // //     paddingVertical: 14,
// // // // // //     paddingHorizontal: 50,
// // // // // //     borderRadius: 50,
// // // // // //     marginBottom: 15,
// // // // // //   },
// // // // // //   buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
// // // // // //   username: { fontSize: 13, color: '#999' },
// // // // // // });
























// // // // import { useRoute, useNavigation } from '@react-navigation/native';
// // // // import React, { useState, useContext, useEffect } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TouchableOpacity,
// // // //   StyleSheet,
// // // //   Alert,
// // // //   ActivityIndicator,
// // // // } from 'react-native';
// // // // import RazorpayCheckout from 'react-native-razorpay';
// // // // import LinearGradient from 'react-native-linear-gradient';
// // // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // // import { ChatContext } from '../component/contexapi.jsx'; // ✅ Apna context
// // // // import api from './basaxiosapi.jsx'; // ✅ Axios instance
// // // // import { BackHandler } from "react-native";
// // // // export default function aaaaaPaymentScreen() {
// // // //   const [loading, setLoading] = useState(false);

// // // //   const route = useRoute();
// // // //   const navigation = useNavigation();
// // // //   const username = route?.params?.username || '';

// // // //   const { updatePremium, setactivechatrom, myUsername } = useContext(ChatContext); // ✅ Context se updatePremium


// // // //   const payNow = async () => {
// // // //     setLoading(true);

// // // //     try {
// // // //       console.log('Ordering');
// // // //       // ✅ Axios se order create karo
// // // //       const res = await api.post('/pyment/order', { amount: 1 }); // ₹1
// // // //       const order = res.data;
// // // //       console.log('Order:', order);

// // // //       const options = {
// // // //         description: 'Premium Membership',
// // // //         image: 'https://yourapp.com/logo.png',
// // // //         currency: 'INR',
// // // //         key: 'rzp_test_RaxCJw54JP8w6L', // ✅ Apna Razorpay Key
// // // //         amount: order.amount,
// // // //         order_id: order.id,
// // // //         name: 'My App Premium',
// // // //         prefill: {
// // // //           email: 'test@example.com',
// // // //           contact: '9999999999',
// // // //           name: username,
// // // //         },
// // // //         theme: { color: '#FF6F61' },
// // // //       };

// // // //       console.log('verfyapi calling')

// // // //       RazorpayCheckout.open(options)
// // // //         .then(async paymentData => {
// // // //           console.log('Payment Success:', paymentData);

// // // //           // ✅ Axios se verify karo
// // // //           const verify = await api.post('/pyment/verify', {
// // // //             razorpay_order_id: paymentData.razorpay_order_id,
// // // //             razorpay_payment_id: paymentData.razorpay_payment_id,
// // // //             razorpay_signature: paymentData.razorpay_signature,
// // // //             username: username,
// // // //           });

// // // //           const data = verify.data;
// // // //           console.log(data);
// // // //           console.log('verfyapi');
// // // //           // ✅ Local save karo
// // // //           await AsyncStorage.setItem('isPremium', 'true');
// // // //           await AsyncStorage.setItem('premiumExpiry', data.premiumUntil);

// // // //           updatePremium(true, data.premiumUntil);

// // // //           Alert.alert('✅ Premium Activated!', `Valid till: ${data.premiumUntil}`);

// // // //           navigation.reset({ index: 0, routes: [{ name: 'ChatList' }] });

// // // //         })
// // // //         .catch(error => {
// // // //           console.log('Payment Failed:', error);
// // // //           Alert.alert('❌ Payment Cancelled', error.description || 'User cancelled');
// // // //         });

// // // //     } catch (err) {
// // // //       console.log('Error:', err);
// // // //       Alert.alert('❌ Error', 'Something went wrong');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };


// // // //   return (
// // // //     <LinearGradient colors={['#FF6F61', '#DE4313']} style={styles.container}>
// // // //       <View style={styles.card}>
// // // //         <Text style={styles.offerTag}>🔥 Limited Offer</Text>
// // // //         <Text style={styles.title}>Unlock Premium</Text>
// // // //         <Text style={styles.price}>₹25 Only</Text>
// // // //         <Text style={styles.subtitle}>
// // // //           Enjoy all premium features for 1 month.
// // // //         </Text>

// // // //         <TouchableOpacity
// // // //           style={styles.button}
// // // //           onPress={payNow}
// // // //           disabled={loading}
// // // //         >
// // // //           {loading ? (
// // // //             <ActivityIndicator color="#fff" />
// // // //           ) : (
// // // //             <Text style={styles.buttonText}>Pay Now</Text>
// // // //           )}
// // // //         </TouchableOpacity>

// // // //         <Text style={styles.username}>Paying as: {myUsername}</Text>
// // // //       </View>
// // // //     </LinearGradient>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// // // //   card: {
// // // //     backgroundColor: '#fff',
// // // //     borderRadius: 20,
// // // //     padding: 30,
// // // //     alignItems: 'center',
// // // //     width: '85%',
// // // //     elevation: 6,
// // // //   },
// // // //   offerTag: {
// // // //     backgroundColor: '#FF6F61',
// // // //     color: '#fff',
// // // //     paddingVertical: 4,
// // // //     paddingHorizontal: 12,
// // // //     borderRadius: 20,
// // // //     fontWeight: 'bold',
// // // //     marginBottom: 12,
// // // //     fontSize: 12,
// // // //   },
// // // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 5, color: '#333' },
// // // //   price: {
// // // //     fontSize: 28,
// // // //     fontWeight: 'bold',
// // // //     color: '#DE4313',
// // // //     marginBottom: 10,
// // // //   },
// // // //   subtitle: {
// // // //     fontSize: 15,
// // // //     color: '#555',
// // // //     marginBottom: 25,
// // // //     textAlign: 'center',
// // // //     lineHeight: 22,
// // // //   },
// // // //   button: {
// // // //     backgroundColor: '#FF6F61',
// // // //     paddingVertical: 14,
// // // //     paddingHorizontal: 50,
// // // //     borderRadius: 50,
// // // //     marginBottom: 15,
// // // //   },
// // // //   buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
// // // //   username: { fontSize: 13, color: '#999' },
// // // // });


















// // import { useRoute, useNavigation } from '@react-navigation/native';
// // import React, { useState, useContext } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   ActivityIndicator,
// // } from 'react-native';
// // import RazorpayCheckout from 'react-native-razorpay';
// // import LinearGradient from 'react-native-linear-gradient';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { ChatContext } from '../component/contexapi.jsx'; // ✅ Apna context
// // import api from './basaxiosapi.jsx'; // ✅ Axios instance

// // export default function TestPaymentScreen() {
// //   const [loading, setLoading] = useState(false);

// //   const route = useRoute();
// //   const navigation = useNavigation();
// //   const username = route?.params?.username || '';

// //   const { updatePremium, myUsername } = useContext(ChatContext);

// //   // const payNow = async () => {
// //   //   setLoading(true);
// //   //   try {
// //   //     console.log('Creating order...');
// //   //     const res = await api.post('/pyment/order', { amount: 1000 }); // ₹1 for test
// //   //     const order = res.data;
// //   //     console.log('Order created:', order);

// //   //     const options = {
// //   //       description: 'Premium Membership',
// //   //       image: 'https://yourapp.com/logo.png',
// //   //       currency: 'INR',
// //   //       key: 'rzp_test_Raxrq2Oolz0F21', // Razorpay test key
// //   //       amount: order.amount,
// //   //       order_id: order.id,
// //   //       name: 'My App Premium',
// //   //       prefill: { email: 'test@example.com', contact: '9569415328', name: username },
// //   //       notes: { username }, // ✅ needed for webhook
// //   //       theme: { color: '#FF6F61' },
// //   //     };

// //   //     RazorpayCheckout.open(options)
// //   //       .then(async paymentData => {
// //   //         console.log('Payment Success:', paymentData.
// //   //           razorpay_order_id
// //   //         );


// //   //         console.log('Payment Data:', paymentData);
// //   //         console.log('Sending to verify:', {
// //   //           razorpay_order_id: paymentData.razorpay_order_id,
// //   //           razorpay_payment_id: paymentData.razorpay_payment_id,
// //   //           razorpay_signature: paymentData.razorpay_signature,
// //   //           username,
// //   //         });


// //   //         // Verify payment via Node.js backend
// //   //         const verify = await api.post('/pyment/verify', {
// //   //           razorpay_order_id: paymentData.razorpay_order_id,
// //   //           razorpay_payment_id: paymentData.razorpay_payment_id,
// //   //           razorpay_signature: paymentData.razorpay_signature,
// //   //           username,
// //   //         });

// //   //         const data = verify.data;
// //   //         console.log('Verify response:', data);

// //   //         await AsyncStorage.setItem('isPremium', 'true');
// //   //         await AsyncStorage.setItem('premiumExpiry', data.premiumUntil);

// //   //         updatePremium(true, data.premiumUntil);

// //   //         Alert.alert('✅ Premium Activated!', `Valid till: ${data.premiumUntil}`);

// //   //         navigation.reset({ index: 0, routes: [{ name: 'ChatList' }] });
// //   //       })
// //   //       .catch(error => {
// //   //         console.log('Payment Failed:', error);
// //   //         Alert.alert('❌ Payment Cancelled', error || 'User cancelled');
// //   //       });

// //   //   } catch (err) {
// //   //     console.log('Error:', err);
// //   //     Alert.alert('❌ Error', 'Something went wrong');
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };




// //   const payNow = async () => {
// //     try {
// //       console.log("Creating order...");
// //       const res = await api.post("/pyment/order", { amount: 125 });
// //       const order = res.data;

// //       const options = {
// //         description: "Premium Membership",
// //         currency: "INR",
// //         key: "rzp_test_RqlfH5s7HXQ2nY",
// //         amount: order.amount,
// //         order_id: order.id || order._id,
// //         name: "My App Premium",
// //         prefill: {
// //           email: "test@example.com",
// //           contact: "6392831776",
// //           name: myUsername
// //         },
// //         notes: { username: myUsername },
// //         theme: { color: "#FF6F61" },
// //       };

// //       RazorpayCheckout.open(options)
// //         .then(async paymentData => {
// //           const verify = await api.post("/pyment/verify", {
// //             razorpay_order_id: paymentData.razorpay_order_id,
// //             razorpay_payment_id: paymentData.razorpay_payment_id,
// //             razorpay_signature: paymentData.razorpay_signature,
// //             username: myUsername
// //           });

// //           const data = verify.data;

// //           await AsyncStorage.setItem("isPremium", "true");
// //           await AsyncStorage.setItem("premiumExpiry", data.premiumUntil.toString());

// //           updatePremium(true, data.premiumUntil);
// //           Alert.alert("✅ Premium Activated!", `Valid till: ${data.premiumUntil}`);
// //         })
// //         .catch(err => {
// //           console.log("Payment Cancelled:", err);
// //           Alert.alert("❌ Payment Cancelled", "User cancelled payment");
// //         });

// //     } catch (err) {
// //       console.log("Order Error:", err);
// //       Alert.alert("❌ Error", "Something went wrong");
// //     }
// //   };

// //   return (
// //     <LinearGradient colors={['#FF6F61', '#DE4313']} style={styles.container}>
// //       <View style={styles.card}>
// //         <Text style={styles.offerTag}>🔥 Limited Offer</Text>
// //         <Text style={styles.title}>Unlock Premium</Text>
// //         <Text style={styles.price}>₹25 Only</Text>
// //         <Text style={styles.subtitle}>
// //           Enjoy all premium features for 1 month.
// //         </Text>

// //         <TouchableOpacity style={styles.button} onPress={payNow} disabled={loading}>
// //           {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Pay Now</Text>}
// //         </TouchableOpacity>

// //         <Text style={styles.username}>Paying as: {myUsername}</Text>
// //       </View>
// //     </LinearGradient>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// //   card: {
// //     backgroundColor: '#fff',
// //     borderRadius: 20,
// //     padding: 30,
// //     alignItems: 'center',
// //     width: '85%',
// //     elevation: 6,
// //   },
// //   offerTag: {
// //     backgroundColor: '#FF6F61',
// //     color: '#fff',
// //     paddingVertical: 4,
// //     paddingHorizontal: 12,
// //     borderRadius: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 12,
// //     fontSize: 12,
// //   },
// //   title: { fontSize: 26, fontWeight: '700', marginBottom: 5, color: '#333' },
// //   price: { fontSize: 28, fontWeight: 'bold', color: '#DE4313', marginBottom: 10 },
// //   subtitle: { fontSize: 15, color: '#555', marginBottom: 25, textAlign: 'center', lineHeight: 22 },
// //   button: { backgroundColor: '#FF6F61', paddingVertical: 14, paddingHorizontal: 50, borderRadius: 50, marginBottom: 15 },
// //   buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
// //   username: { fontSize: 13, color: '#999' },
// // });













// import { useRoute, useNavigation } from '@react-navigation/native';
// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';

// import RazorpayCheckout from 'react-native-razorpay';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ChatContext } from '../component/contexapi.jsx';
// import api from './basaxiosapi.jsx';

// export default function TestPaymentScreen() {
//   const [loading, setLoading] = useState(false);

//   const navigation = useNavigation();
//   const { updatePremium, } = useContext(ChatContext);

//   let router = useRoute()

//   let { myUsername } = router.params

//   console.log('userdataname', myUsername)

//   const payNow = async () => {
//     try {
//       setLoading(true);

//       console.log("Creating order...");
//       const res = await api.post("/pyment/order", { amount: 5551 }); // ₹51 → UPI visible
//       const order = res.data;

//       const options = {
//         description: "Premium Membership",
//         currency: "INR",
//         key: "rzp_test_RqlfH5s7HXQ2nY",
//         amount: order.amount,
//         order_id: order.id,
//         name: "My App Premium",
//         method: {
//           upi: true,
//           card: true,
//           netbanking: true,
//           wallet: true,
//         },
//         prefill: {
//           email: "test@example.com",
//           contact: "6392831776",
//           name: myUsername
//         },
//         notes: { username: myUsername },
//         theme: { color: "#FF6F61" },
//       };

//       RazorpayCheckout.open(options)
//         .then(async paymentData => {
//           console.log("Payment Success:", paymentData);

//           const verify = await api.post("/pyment/verify", {
//             razorpay_order_id: paymentData.razorpay_order_id,
//             razorpay_payment_id: paymentData.razorpay_payment_id,
//             razorpay_signature: paymentData.razorpay_signature,
//             username: myUsername
//           });

//           const data = verify.data;

//           await AsyncStorage.setItem("isPremium", "true");
//           await AsyncStorage.setItem("premiumExpiry", data.premiumUntil.toString());

//           updatePremium(true, data.premiumUntil);

//           Alert.alert("🎉 Premium Activated!", `Valid till: ${data.premiumUntil}`);

//           navigation.reset({
//             index: 0,
//             routes: [{ name: "ChatList" }],
//           });
//         })
//         .catch(err => {
//           console.log("Payment Cancelled:", err);
//           Alert.alert("❌ Payment Cancelled", "User cancelled payment");
//         });

//     } catch (err) {
//       Alert.alert("Error", "Unable to start payment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <LinearGradient colors={['#FF6F61', '#DE4313']} style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.offerTag}>🔥 Limited Offer</Text>
//         <Text style={styles.title}>Unlock Premium</Text>
//         <Text style={styles.price}>₹25 Only</Text>
//         <Text style={styles.subtitle}>
//           Enjoy all premium features for 1 month.
//         </Text>

//         <TouchableOpacity style={styles.button} onPress={payNow} disabled={loading}>
//           {loading
//             ? <ActivityIndicator color="#fff" />
//             : <Text style={styles.buttonText}>Pay Now</Text>
//           }
//         </TouchableOpacity>

//         <Text style={styles.username}>Paying as: {myUsername}</Text>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 30,
//     alignItems: "center",
//     width: "85%",
//     elevation: 6,
//   },
//   offerTag: {
//     backgroundColor: "#FF6F61",
//     color: "#fff",
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     fontWeight: "bold",
//     marginBottom: 12,
//     fontSize: 12,
//   },
//   title: { fontSize: 26, fontWeight: "700", marginBottom: 5, color: "#333" },
//   price: { fontSize: 28, fontWeight: "bold", color: "#DE4313", marginBottom: 10 },
//   subtitle: { fontSize: 15, color: "#555", marginBottom: 25, textAlign: "center" },
//   button: {
//     backgroundColor: "#FF6F61",
//     paddingVertical: 14,
//     paddingHorizontal: 50,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   buttonText: { color: "#fff", fontSize: 17, fontWeight: "700" },
//   username: { fontSize: 13, color: "#999" },
// });


