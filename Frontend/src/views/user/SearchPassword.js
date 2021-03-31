import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {sendEmailForPW, confirmEmailForPW} from '../../api/accounts/login';
import BasicButton from '../../components/elements/BasicButton';
import Header from '../../components/elements/Header';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';

// static variable
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768

export default function SearchPassword({navigation}) {
  const [checkBoxColor, setCheckBoxColor] = useState(true);
  const [userWriteEmail, setUserWriteEmail] = useState('');
  const [userWriteName, setUserWriteName] = useState('');
  const [userTicket, setUserTicket] = useState('');
  const [codeInputState, setCodeInputState] = useState(false);
  const [VisibleState, setVisibleState] = useState(true);
  const [userWriteCode, setUserWriteCode] = useState('');
  const AuthenticateEmail = async () => {
    let PasswordForm = new FormData();
    PasswordForm.append('email', userWriteEmail);
    PasswordForm.append('username', userWriteName);
    sendEmailForPW(
      PasswordForm,
      (res) => {
        setUserTicket(res.data.id);
        setVisibleState(false);
        setCodeInputState(true);
        alert('인증번호를  보냈습니다.');
      },
      (error) => {
        alert('정보가 일치하지않습니다');
        console.log(error);
      },
    );
  };
  const AuthenticateCode = () => {
    let CodeForm = new FormData();
    CodeForm.append('email', userWriteEmail);
    CodeForm.append('code', userWriteCode);
    CodeForm.append('id', userTicket);
    confirmEmailForPW(
      CodeForm,
      (res) => {
        navigation.navigate('ModifyPassword', {user_ID: res.data.user});
      },
      (error) => {
        alert('코드가 일치하지 않습니다.');
        console.log(error);
      },
    );
  };
  return (
    <AuthBackGround>
      <Header logoHeader={true} />
      <View style={styles.container}>
        <View style={styles.view}>
          <AuthTitle title={'비밀번호 찾기'} />
        </View>
        <View style={styles.view}>
          <AuthTextInput
            text={'이메일을 입력하세요'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserWriteEmail}
            secureTextEntry={false}
            autoFocus={false}
            marginBottom={windowHeight * 0.043}
          />
          <AuthTextInput
            text={'아이디를 입력해주세요'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserWriteName}
            secureTextEntry={false}
            autoFocus={false}
          />
        </View>
        {VisibleState ? (
          <View style={styles.view}>
            <BasicButton
              text="본인인증"
              customFontSize={24}
              paddingHorizon={24}
              paddingVertical={11}
              btnWidth={windowWidth * 0.3}
              btnHeight={windowHeight * 0.08}
              borderRadius={14}
              margin={10}
              onHandlePress={() => AuthenticateEmail()}
            />
          </View>
        ) : null}
        {codeInputState ? (
          <View style={styles.view}>
            <AuthTextInput
              text={'인증코드를 입력해주세요'}
              width={windowWidth * 0.3}
              height={windowHeight * 0.08}
              size={18}
              setFunction={setUserWriteCode}
              secureTextEntry={true}
              autoFocus={false}
            />
            <BasicButton
              text="확인"
              customFontSize={24}
              paddingHorizon={24}
              paddingVertical={11}
              btnWidth={windowWidth * 0.3}
              btnHeight={windowHeight * 0.08}
              borderRadius={14}
              margin={windowHeight * 0.04}
              onHandlePress={() => AuthenticateCode()}
            />
          </View>
        ) : null}
      </View>
    </AuthBackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: windowWidth * 0.4,
    height: windowHeight * 0.803,
    borderRadius: 30,
    elevation: 7,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
  start: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: windowWidth * 0.3,
    marginTop: windowHeight * 0.043 * 2,
  },
  label: {
    fontSize: 18,
    color: '#707070',
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
  checkOption: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: windowWidth * 0.05,
  },
  checkBox: {
    fontSize: 30,
  },
});