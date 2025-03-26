import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {CameraIcon, CameraIconWhite} from '../../assets/icons';
import {Fonts} from '../constants/font';
import useUserStore from '../zustand/userStore';
import uuid from 'react-native-uuid';
import ImagePicker from 'react-native-image-crop-picker';
import CustomLoading from './CustomLoading';
import useColors from '../zustand/useColor';
import useThemeStore from '../zustand/themeStore';

type Props = {
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const UserCreateModal = (props: Props) => {
  const {setModalVisible} = props;
  const colors = useColors();
  const {isDarkMode} = useThemeStore();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const {
    isLoadingUser,
    errMessage,
    succMessage,
    setSuccMessage,
    setErrMessage,
    createUser,
  } = useUserStore();

  useEffect(() => {
    if (errMessage) {
      Alert.alert('Failed', errMessage, [
        {
          text: 'OK',
          onPress: () => {
            setErrMessage(null);
          },
        },
      ]);
    }
  }, [errMessage, setErrMessage]);

  useEffect(() => {
    if (succMessage) {
      Alert.alert('Success', succMessage, [
        {
          text: 'OK',
          onPress: () => {
            setSuccMessage(null);
            setName('');
            setImageUrl('');
            setModalVisible(false);
          },
        },
      ]);
    }
  }, [succMessage, setSuccMessage, setModalVisible]);

  const openGallery = async () => {
    const result = await ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      width: 300,
      height: 300,
    });

    if (result && result.path) {
      setImageUrl(result.path);
    }
  };

  const handleClose = () => {
    setName('');
    setImageUrl('');
    setNameError('');
    setErrMessage(null);
    setSuccMessage(null);
    props.setModalVisible(false);
  };

  const handleCreateUser = async () => {
    setNameError('');
    if (!name) {
      setNameError('Name is required');
      return;
    }
    const newUuid = uuid.v4().toString();
    await createUser({
      uuid: newUuid,
      name: name,
      image_url: imageUrl,
    });
  };

  return (
    <Modal
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
          style={[
            tw`flex-1 justify-center items-center px-5`,
            {backgroundColor: colors.bgModal},
          ]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={[
                tw`w-full rounded-lg items-center`,
                {backgroundColor: colors.background},
              ]}>
              <Image
                source={require('../../assets/images/paint.png')}
                style={tw`w-full rounded-lg h-110`}
              />
              <View
                style={[
                  tw`absolute bottom-0 left-0 py-4 px-6 w-full rounded-lg items-center`,
                  {backgroundColor: colors.background},
                ]}>
                <TouchableOpacity
                  onPress={openGallery}
                  style={[
                    tw`absolute -top-13 p-2 rounded-full items-center`,
                    {backgroundColor: colors.background},
                  ]}>
                  <Image
                    source={
                      imageUrl
                        ? {uri: imageUrl}
                        : require('../../assets/images/default_profile.jpg')
                    }
                    style={tw`w-20 h-20 rounded-full`}
                  />
                  <View
                    style={[
                      tw`absolute bottom-0 right-0 p-1 rounded-full items-center`,
                      {backgroundColor: colors.background},
                    ]}>
                    {isDarkMode ? <CameraIconWhite /> : <CameraIcon />}
                  </View>
                </TouchableOpacity>
                <View style={tw`py-6`} />
                <Text
                  style={[
                    tw``,
                    {color: colors.text, fontFamily: Fonts.semiBold},
                  ]}>
                  Buat profile terlebih anda
                </Text>
                <View style={tw`py-4`} />
                <View style={tw`flex-row items-center justify-start w-full`}>
                  <Text
                    style={[
                      tw``,
                      {color: colors.text, fontFamily: Fonts.regular},
                    ]}>
                    Your Name
                  </Text>
                </View>
                <View style={tw`py-1`} />
                <View style={tw`w-full`}>
                  <TextInput
                    placeholder="Charlie"
                    placeholderTextColor={colors.gray}
                    value={name}
                    keyboardType="default"
                    onChangeText={setName}
                    cursorColor={colors.primary}
                    style={[
                      tw`h-10 w-full px-3 opacity-50 rounded-lg`,
                      {backgroundColor: colors.secondary},
                    ]}
                  />
                  {nameError ? (
                    <Text style={[tw`mt-1`, {color: colors.error}]}>
                      {nameError}
                    </Text>
                  ) : null}
                </View>
                <View style={tw`py-5`} />
                <TouchableOpacity
                  disabled={!name}
                  onPress={handleCreateUser}
                  style={[
                    tw`py-3 px-8 rounded-3xl`,
                    styles.shadow,
                    {
                      backgroundColor: name ? colors.primary : colors.bgModal,
                      shadowColor: colors.primary,
                    },
                  ]}>
                  <Text
                    style={[
                      tw`text-center text-xs`,
                      {color: colors.white, fontFamily: Fonts.regular},
                    ]}>
                    Confirm
                  </Text>
                </TouchableOpacity>
                <View style={tw`py-3`} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {isLoadingUser && <CustomLoading />}
    </Modal>
  );
};

export default UserCreateModal;

export const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
});
