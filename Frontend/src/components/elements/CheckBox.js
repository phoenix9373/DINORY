import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {Text, View, StyleSheet, Animated, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Sound from 'react-native-sound';

export default function CheckBox({
  textEn,
  textKr,
  ischecked,
  onHandleCheck,
  soundUrl,
}) {
  const textEnWidth = windowWidth * 0.17;
  const textKrWidth = windowWidth * 0.17;

  const [check, setCheck] = useState(false);

  const baseUrl = 'https://j4b105.p.ssafy.io/api';
  // 카드 애니메이션
  const animatedValue = useMemo(() => new Animated.Value(0), []);
  let value = 0;
  animatedValue.addListener((e) => {
    value = e.value;
  });

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: frontInterpolate,
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: backInterpolate,
      },
    ],
  };

  // Method 정의

  const onHandleFlipCard = useCallback(() => {
    if (value >= 90) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 180,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [value, animatedValue]);

  const onHandleCheckState = () => {
    setCheck((prevCheck) => !prevCheck);
  };

  useEffect(() => {
    onHandleFlipCard();
  }, [onHandleFlipCard]);

  const sound = new Sound(baseUrl + soundUrl, Sound.MAIN_BUNDLE, (error) => {});

  return (
    <View style={[styles.box, {width: textEnWidth}]}>
      {/* front */}
      {/* 코드 순서상 아래에 있는 back이 먼저 보임. 따라서 textKr을 front에서 출력합니다.  */}
      <Animated.View
        style={[
          styles.container,
          styles.front,
          frontAnimatedStyle,
          {
            backgroundColor: ischecked ? '#19DC4D' : 'white',
            width: textEnWidth,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            onHandleCheckState();
            onHandleCheck
              ? onHandleCheck()
              : alert('함수를 props로 내려주세요!');
          }}
          style={styles.checkRound}>
          {ischecked && <FontAwesome5 style={styles.check} name={'check'} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchText}
          onPress={() => onHandleFlipCard()}
          name={'check'}>
          <Text style={styles.text}>{textKr}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.volume}
          onPress={() =>
            sound.stop(() => {
              sound.play();
            })
          }>
          <FontAwesome5
            style={styles.volumeIcon}
            name={'volume-up'}
            color="#9D9D9D"
          />
        </TouchableOpacity>
      </Animated.View>

      {/* back */}
      <Animated.View
        style={[
          styles.container,
          styles.back,
          backAnimatedStyle,
          {
            backgroundColor: ischecked ? '#19DC4D' : 'white',
            width: textEnWidth,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            onHandleCheckState();
            onHandleCheck
              ? onHandleCheck()
              : alert('함수를 props로 내려주세요!');
          }}
          style={styles.checkRound}>
          {ischecked && <FontAwesome5 style={styles.check} name={'check'} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchText}
          onPress={() => onHandleFlipCard()}>
          <Text style={styles.text}>{textEn}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.volume}
          onPress={() =>
            sound.stop(() => {
              sound.play();
            })
          }>
          <FontAwesome5
            style={styles.volumeIcon}
            name={'volume-up'}
            color="#9D9D9D"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width; // 1280
const windowHeight = Dimensions.get('window').height; // 768

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    minHeight: windowHeight * 0.07,
    margin: windowWidth * 0.005,
  },
  container: {
    minHeight: windowHeight * 0.07,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: windowWidth * 0.0125,
    paddingRight: windowWidth * 0.0125,
    paddingTop: windowHeight * 0.011,
    paddingBottom: windowHeight * 0.011,
    fontFamily: 'HoonPinkpungchaR',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  check: {
    color: '#19DC4D',
    fontSize: windowWidth * 0.011,
  },
  checkRound: {
    width: windowWidth * 0.02,
    height: windowWidth * 0.02,
    borderWidth: windowWidth * 0.0015625,
    borderColor: '#DBDBDB',
    borderRadius: 1000,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchText: {
    minWidth: windowWidth * 0.1,
    display: 'flex',
    height: windowHeight * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: windowWidth * 0.017,
    fontFamily: 'HoonPinkpungchaR',
    marginLeft: windowWidth * 0.013,
  },
  volume: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.034,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  volumeIcon: {
    fontSize: windowWidth * 0.015625,
  },
  back: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
  },
});
