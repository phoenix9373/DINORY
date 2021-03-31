import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
// import SelectLayout from '../../../components/elements/SelectLayout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ArrowButton from '../../../components/elements/ArrowButton';
import ContentTitle from '../../../components/elements/ContentTitle';
import Layout from '../../../components/elements/Layout';
import {getChildProfile} from '../../../api/accounts/childSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectProfileButton from '../../../components/authorization/SelectProfileButton';

// static variable
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

// imageSrc
// const character1 = require('../../../assets/images/character1.png');
// const character2 = require('../../../assets/images/character2.png');
// const character3 = require('../../../assets/images/character3.png');
// const character4 = require('../../../assets/images/character4.png');
// const character5 = require('../../../assets/images/character5.png');

export default function SelectProfile({navigation}) {
  useEffect(() => {
    AsyncStorage.getItem('jwt').then((value) => {
      console.log(value);
    });
    getChildProfile(
      (res) => {
        setChildrenInfo(res.data);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);
  const [childrenInfo, setChildrenInfo] = useState(childrenInfo);
  const imageSrc = require('../../../assets/images/background2.png');
  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <View style={styles.start}>
        <View>
          <ArrowButton onHandlePress={() => navigation.goBack()}></ArrowButton>
        </View>
        <View style={styles.logo}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}></Image>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.view}>
          <ContentTitle title={'프로필을 선택하세요'}></ContentTitle>
        </View>
        <View>
          <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.bodyCardContainer}>
              {childrenInfo &&
                childrenInfo.map((profile) => {
                  const {id, img, name, parent, voice, year} = profile;
                  const imageSrc = transformImage(img);
                  const onButtonClick = () => {
                    AsyncStorage.setItem('child_pk', String(id)),
                      AsyncStorage.setItem('img', String(imageSrc)),
                      AsyncStorage.setItem('name', String(name)),
                      AsyncStorage.setItem('parent', String(parent)),
                      AsyncStorage.setItem('voice', String(voice)),
                      AsyncStorage.setItem('year', String(year)),
                      navigation.navigate('Main');
                  };
                  return (
                    <View key={id}>
                      <SelectProfileButton
                        imageSrc={imageSrc}
                        Name={name}
                        onHandlePress={onButtonClick}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </Layout>
        </View>
      </View>
      <View style={styles.end}></View>
    </BackgroundAbsolute>
  );
}

const transformImage = (num) => {
  let Src = '';
  console.log('num : ', num);
  console.log('num Type : ', typeof num);
  switch (String(num)) {
    case '1':
      Src = require('../../../assets/images/character1.png');
      break;
    case '2':
      Src = require('../../../assets/images/character2.png');
      break;
    case '3':
      Src = require('../../../assets/images/character3.png');
      break;
    case '4':
      Src = require('../../../assets/images/character4.png');
      break;
    default:
      Src = require('../../../assets/images/character5.png');
      break;
  }
  return Src;
};

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    flex: 1.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
  view: {
    marginBottom: 26,
    zIndex: 3,
  },
  body: {
    // flexDirection: 'row',
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  end: {
    flex: 1,
  },
  bodyCardContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 100,
    paddingLeft: windowWidth * 0.12,
  },
});
