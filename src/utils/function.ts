import ImagePicker from 'react-native-image-crop-picker';

type GalleryProps = {
  setImageUrl: (url: string) => void;
};

export const openGallery = async (props: GalleryProps) => {
  const result = await ImagePicker.openPicker({
    mediaType: 'photo',
    cropping: true,
    width: 300,
    height: 300,
  });

  if (result && result.path) {
    props.setImageUrl(result.path);
  }
};
