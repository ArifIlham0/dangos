import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../constants/font';
import tw from 'twrnc';
import {CrossIcon, SendIconWhite} from '../../assets/icons';
import {CreatePostForm, CustomLoading} from '../components';
import {Alert} from 'react-native';
import usePostStore from '../zustand/postStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useColors from '../zustand/useColor';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const colors = useColors();
  const {isLoadingPost, succMessage, errMessage, createPost} = usePostStore();
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [caption, setCaption] = useState('');

  const handleCreatePost = async () => {
    const uuid = await AsyncStorage.getItem('uuid');
    if (!uuid) {
      Alert.alert('Failed', 'User ID is required');
      return;
    }
    if (!hours || !minutes) {
      Alert.alert('Failed', 'Hours and minutes are required');
      return;
    }
    await createPost({
      user: uuid,
      caption: caption,
      is_week: value === 'week' ? true : false,
      apps: [],
    });
  };

  return (
    <Modal
      visible={true}
      onRequestClose={() => navigation.goBack()}
      animationType="slide"
      presentationStyle="pageSheet">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            tw`flex-1 items-center`,
            {backgroundColor: colors.background},
          ]}>
          <View
            style={tw`flex-row items-center justify-between pt-4 w-full px-5`}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                tw`px-2.2 py-2 rounded-full`,
                {backgroundColor: colors.primary},
              ]}>
              <CrossIcon width={20} height={20} />
            </TouchableOpacity>
            <Text style={[tw`text-lg`, {fontFamily: Fonts.semiBold}]}>
              Create Post
            </Text>
            <TouchableOpacity
              onPress={handleCreatePost}
              style={[
                tw`px-2.2 py-2 rounded-full`,
                {backgroundColor: colors.primary},
              ]}>
              <SendIconWhite width={20} height={20} />
            </TouchableOpacity>
          </View>
          <View style={tw`py-2`} />
          <View
            style={[
              tw`flex-1 w-full h-full rounded-tl-3xl rounded-tr-3xl px-5`,
              {backgroundColor: colors.secondary},
            ]}>
            <View style={tw`py-2`} />
            <Text style={[tw`text-center`, {fontFamily: Fonts.semiBold}]}>
              Show your screen time!
            </Text>
            <View style={tw`py-4`} />
            <CreatePostForm
              value={value}
              isFocus={isFocus}
              hours={hours}
              minutes={minutes}
              caption={caption}
              setValue={setValue}
              setIsFocus={setIsFocus}
              setHours={setHours}
              setMinutes={setMinutes}
              setCaption={setCaption}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {isLoadingPost && <CustomLoading />}
    </Modal>
  );
};

export default CreatePostScreen;
