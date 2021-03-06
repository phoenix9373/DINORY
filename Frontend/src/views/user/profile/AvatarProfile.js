// basic
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';

// axios
import {createChildProfile} from '../../../api/accounts/childSettings';

// 컴포넌트
import Layout from '../../../components/elements/Layout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ContentTitle from '../../../components/elements/ContentTitle';
import DinoButton from '../../../components/elements/DinoButton';
import Header from '../../../components/elements/Header';
import AlertModal from '../../../components/elements/AlertModal';
import RoundButton from '../../../components/elements/RoundButton';

// 화면세팅
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function AvatarProfile({navigation, route}) {
  const imageSrc = require('../../../assets/images/background2.png');
  const [imgNumber, setImgNumber] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [fmodalVisible, setfModalVisible] = useState(false);
  const [emodalVisible, seteModalVisible] = useState(false);

  // 프로필 사진 고르기
  const selectNumber = (num) => {
    setImgNumber(num);
  };

  const CreateProfile = () => {
    if (imgNumber !== -1) {
      let ProfileInfo = new FormData();
      ProfileInfo.append('name', route.params.ProfileName);
      ProfileInfo.append('year', route.params.ProfileYear);
      ProfileInfo.append('img', imgNumber);
      createChildProfile(
        ProfileInfo,
        (res) => {
          changeModalState();
          setTimeout(() => {
            navigation.navigate('SelectProfile');
          }, 1500);
        },
        (error) => {
          echangeModalState();
        },
      );
    } else {
      fchangeModalState();
    }
  };

  // 프로필 생성 성공 모달
  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 1500);
  };

  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };

  // 프로필 아바타 안선택했을 때 모달
  const fcloseModal = () => {
    setTimeout(() => {
      setfModalVisible(!fmodalVisible);
    }, 2000);
  };

  const fchangeModalState = () => {
    setfModalVisible(!fmodalVisible);
  };
  const ecloseModal = () => {
    setTimeout(() => {
      seteModalVisible(!emodalVisible);
    }, 2000);
  };

  const echangeModalState = () => {
    seteModalVisible(!emodalVisible);
  };

  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <Header logoHeader={true} />
      <View style={styles.body}>
        <ContentTitle title={'아바타를 선택하세요'} />
        <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
          <View style={styles.crownWrapper}>
            {imgNumber === 0 ? (
              <Image
                style={styles.crownImage}
                source={require('../../../assets/images/crown.png')}
              />
            ) : (
              <View style={styles.null}></View>
            )}
            {imgNumber === 1 ? (
              <Image
                style={styles.crownImage}
                source={require('../../../assets/images/crown.png')}
              />
            ) : (
              <View style={styles.null}></View>
            )}
            {imgNumber === 2 ? (
              <Image
                style={styles.crownImage}
                source={require('../../../assets/images/crown.png')}
              />
            ) : (
              <View style={styles.null}></View>
            )}
            {imgNumber === 3 ? (
              <Image
                style={styles.crownImage}
                source={require('../../../assets/images/crown.png')}
              />
            ) : (
              <View style={styles.null}></View>
            )}
            {imgNumber === 4 ? (
              <Image
                style={styles.crownImage}
                source={require('../../../assets/images/crown.png')}
              />
            ) : (
              <View style={styles.null}></View>
            )}
          </View>
          <View style={styles.selectDino}>
            <DinoButton
              imgSrc={require('../../../assets/images/character1.png')}
              widthProps={width * 0.08}
              onHandlePress={() => selectNumber(0)}
            />
            <DinoButton
              imgSrc={require('../../../assets/images/character2.png')}
              widthProps={width * 0.08}
              onHandlePress={() => selectNumber(1)}
            />
            <DinoButton
              imgSrc={require('../../../assets/images/character3.png')}
              widthProps={width * 0.08}
              onHandlePress={() => selectNumber(2)}
            />
            <DinoButton
              imgSrc={require('../../../assets/images/character4.png')}
              widthProps={width * 0.08}
              onHandlePress={() => selectNumber(3)}
            />
            <DinoButton
              imgSrc={require('../../../assets/images/character5.png')}
              widthProps={width * 0.08}
              onHandlePress={() => selectNumber(4)}
            />
          </View>
          <RoundButton
            arrow={true}
            onHandlePress={() => {
              CreateProfile();
            }}
          />
          <AlertModal
            modalVisible={modalVisible}
            onHandleCloseModal={() => changeModalState()}
            text={'프로필이 생성되었습니다'}
            iconName={'smileo'}
            color={'green'}
            setTimeFunction={() => closeModal()}
          />
          <AlertModal
            modalVisible={fmodalVisible}
            onHandleCloseModal={() => fchangeModalState()}
            text={'아바타를 선택해주세요!'}
            iconName={'frowno'}
            color={'red'}
            setTimeFunction={() => fcloseModal()}
          />
          <AlertModal
            modalVisible={emodalVisible}
            onHandleCloseModal={() => echangeModalState()}
            text={'프로필에 입력이 잘못되었거나 서버가 불안정합니다!'}
            iconName={'frowno'}
            color={'red'}
            setTimeFunction={() => ecloseModal()}
          />
        </Layout>
      </View>
    </BackgroundAbsolute>
  );
}
const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.14,
  },
  selectDino: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: height * 0.11,
    width: '90%',
  },
  crownWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
  },
  crownImage: {
    width: width * 0.13,
    height: height * 0.13,
  },
  null: {
    width: width * 0.13,
    height: height * 0.13,
  },
});
