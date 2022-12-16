import {Props} from '@navigation/InjectInterface';
import {useGetProductByIdQuery} from '@presenter/domain/RTKQuery/product.rtk';
import {useState} from 'react';
import {Dimensions} from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('screen').width;

export const useHookDetail = (props: Props) => {
  const {id}: any = props.route.params;
  const {data, isFetching} = useGetProductByIdQuery(id);
  const height = useSharedValue(1);

  const [loadingImage, setloadingImage] = useState(true);

  const showAnimated = () => {
    height.value = 300;
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: screenWidth - 8,
      height: withTiming(height.value, {
        duration: 3000,
        easing: Easing.out(Easing.exp),
      }),
      paddingVertical: 24,
    };
  });

  return {
    data,
    isFetching,
    loadingImage,
    animatedStyles,
    setloadingImage,
    showAnimated,
  };
};
