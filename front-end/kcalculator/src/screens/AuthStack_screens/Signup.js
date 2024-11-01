import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components/native';
import { View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { Alert } from 'react-native';
import axios from 'axios';
import config from "../config";
const backendUrl = config.backendUrl;
const InputField = styled.TextInput`
  flex: 1;
  height: 60px;
  border-color: green;
  border-width: 1px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
`;

const WhiteButton = styled(TouchableOpacity)`
    background-color: #39D02C;
    height: 60px;
    width: 260px;
    border-radius: 10px;
     align-items: center; /* 수직 정렬 */
      justify-content: center; /* 수평 정렬 */
  margin-left: 30px;
`;

const ButtonText = styled.Text`
    font-size: 25px;
    color: #ffffff;
  `;


const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0px 20px;
`;




const Signup = ({ navigation }) => {
  const [user, setUser] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
  });

    const handleChangeId = (value) => setUser((prevUser) => ({ ...prevUser, id: value }));
    const handleChangeName = (value) => setUser((prevUser) => ({ ...prevUser, name: value }));
    const handleChangeEmail = (value) => setUser((prevUser) => ({ ...prevUser, email: value }));
    const handleChangePassword = (value) => setUser((prevUser) => ({ ...prevUser, password: value }));
    const handleChangeConfirmPassword = (value) =>
        setUser((prevUser) => ({ ...prevUser, confirmPassword: value }));
    const handleSubmit = async () => {
        if (user.password !== user.confirmPassword) {
            Alert.alert('오류', '비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        try {
            const response = await axios.post(`${backendUrl}/api/users/join`, {
                userId: user.id,
                password: user.password,
                name: user.name,
                email: user.email,
            });
            // 백엔드가 성공 메시지를 반환하면
            if (response.data === '회원가입이 성공 했습니다.') {
                Alert.alert(
                    '회원가입 완료',
                    '회원가입이 성공적으로 완료되었습니다.',
                    [
                        {
                            text: '확인',
                            onPress: () => {
                                navigation.navigate('Login');
                            },
                        },
                    ]
                );
            } else {
                // 다른 응답 시나리오에 대한 처리
                Alert.alert('회원가입 실패', '회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error.message);
            Alert.alert('오류', '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

  return (
  <Container>
     <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40, marginLeft: 30,marginTop:-10}}>
       <Text style={{ fontSize: 30, fontWeight: 'bold' }}>회원가입</Text>
     </View>


    <View style={{ flexDirection: 'row', marginBottom: 20, width: '80%', marginLeft: 30 }}>
       <InputField
        placeholder=" 아이디"
        value={user.id}
        onChangeText={handleChangeId}
        />

    </View>


    <View style={{ flexDirection: 'row', marginBottom: 20, width: '80%', marginLeft: 30 }}>
           <InputField
            placeholder=" 비밀번호"
            secureTextEntry
            value={user.password}
            onChangeText={handleChangePassword}
            />
     </View>

    <View style={{ flexDirection: 'row', marginBottom: 20, width: '80%', marginLeft: 30 }}>
           <InputField
            placeholder=" 비밀번호 확인"
            secureTextEntry
            value={user.confirmPassword}
            onChangeText={handleChangeConfirmPassword}
            />
     </View>

    <View style={{ flexDirection: 'row', marginBottom: 20, width: '80%', marginLeft: 30 }}>
        <InputField
            placeholder=" 이름"
            value={user.name}
            onChangeText={handleChangeName}
            />
     </View>
    <View style={{ flexDirection: 'row', marginBottom: 20, width: '80%', marginLeft: 30 }}>
        <InputField
             placeholder=" 이메일"
             value={user.email}
             onChangeText={handleChangeEmail}
             />
      </View>


       <View>
              <WhiteButton
              onPress={handleSubmit}>
                <ButtonText>회원가입</ButtonText>
              </WhiteButton>
            </View>


  </Container>
  );
}

export default Signup;
