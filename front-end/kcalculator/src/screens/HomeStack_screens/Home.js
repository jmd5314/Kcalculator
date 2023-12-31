import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ProgressChart } from 'react-native-chart-kit';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const backendUrl = config.backendUrl;

const Home = ({ navigation }) => {
  const [ weight, setWeight ] = useState('');
  const [ recommendedCalories, setRecommendedCalories ] = useState('');
  const [ recommendedCarbohydrates, setRecommendedCarbohydrates ] = useState('');
  const [ recommendedProteins, setRecommendedProteins ] = useState('');
  const [ recommendedFats, setRecommendedFats ] = useState('');

  const data = {
    labels: ["탄수화물", "단백질", "지방"],
    data: [0, 0, 0],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(57,208,44, ${opacity})`,
    strokeWidth: 2,
  };
/*
  const consumedCarbsPercentage = Math.round((10 / recommendedCarbohydrates) * 100);
  const consumedProteinPercentage = Math.round((10 / recommendedProteins) * 100);
  const consumedFatPercentage = Math.round((10 / recommendedFats) * 100);
*/
  useEffect(() => {
    const fetchRecommendedFromBackend = async () => {
        const token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.get(`${backendUrl}/api/profiles/home`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setRecommendedCalories(response.data.recommendedCalories);
        setRecommendedCarbohydrates(response.data.recommendedCarbohydrates);
        setRecommendedProteins(response.data.recommendedProteins);
        setRecommendedFats(response.data.recommendedFats);
      } catch (error) {
        console.error('Error fetching recommended:', error);
      }
    };
    fetchRecommendedFromBackend();
  }, []);

  const sendWeightToServer = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
        console.error('Token not found');
        return;
    }
    const weightData = {
        weight,
    };

    fetch(`${backendUrl}/api/profiles/home/updateWeight`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(weightData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답이 정상이 아닙니다');
            }
            return response.json();
        })
        .then(data => {
            console.log('몸무게가 성공적으로 전송되었습니다:',data);
        })
        .catch(error => {
            console.error('몸무게 전송 중 오류 발생:', error);
        });
};

  return (
    <SafeAreaView style={{ backgroundColor: 'white'}}>
        <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 20, marginLeft: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <MaterialIcons name="account-circle" size={50} />
            </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              {recommendedCalories}kcal / {recommendedCalories}kcal
            </Text>
            
        </View>
        <View style={styles.container}>
            <View>
              <ProgressChart
                data={data}
                width={400}
                height={300}
                chartConfig={chartConfig}
                hideLegend={false}
              />
            </View>
        </View>
        <View style={{ marginLeft: 20 }}>
            <View style={styles.infoContainer}>
                <View style={[styles.icon, { backgroundColor: '#F79800' }]} />
                <Text style={{ fontSize: 20, marginRight: 90}}>탄수화물</Text>
                <Text style={{ fontSize: 20, marginRight: 120}}>0g</Text>
                <Text style={{ fontSize: 20}}>0%</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={[styles.icon, { backgroundColor: '#34F200' }]} />
                <Text style={{ fontSize: 20, marginRight: 110}}>단백질</Text>
                <Text style={{ fontSize: 20, marginRight: 120}}>0g</Text>
                <Text style={{ fontSize: 20}}>0%</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={[styles.icon, { backgroundColor: '#0095A3' }]} />
                <Text style={{ fontSize: 20, marginRight: 130}}>지방</Text>
                <Text style={{ fontSize: 20, marginRight: 120}}>0g</Text>
                <Text style={{ fontSize: 20}}>0%</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '80%', marginLeft: 12, marginTop:10}}>
            <TextInput
                  style={{ height: 40, width: 120, borderColor: 'gray', borderWidth: 1, margin: 10, padding:5 }}
                  onChangeText={(text) => setWeight(text)}
                  placeholder="현재 체중 (kg)"
                  keyboardType="numeric"/>
            <TouchableOpacity
                style={{
                    backgroundColor: '#39D02C',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={sendWeightToServer}
            >
                <Text style={{ color: '#fff', fontSize: 16 }}>입력</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default Home;