import React from 'react';
import {ActivityIndicator, Image, ScrollView, StyleSheet} from 'react-native';
import {Text, View, Button} from 'react-native-ui-lib';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Props} from '@navigation/InjectInterface';
import {useHookDetail} from './hookScreen';
import Animated from 'react-native-reanimated';
import {format, parseISO} from 'date-fns';

const DetailScreen: React.FC<Props> = props => {
  const {
    data,
    isFetching,
    loadingImage,
    animatedStyles,
    setloadingImage,
    showAnimated,
  } = useHookDetail(props);

  return (
    <SafeAreaView style={styles.container}>
      <View
        backgroundColor="#BECBEF"
        height={100}
        style={{justifyContent: 'flex-end'}}>
        <Text style={styles.name} marginB-12 marginL-12>
          {data?.product}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{paddingHorizontal: 8}}>
        {loadingImage && data?.image && (
          <ActivityIndicator size={40} color="black" style={styles.indicator} />
        )}
        {data?.image && (
          <Animated.View style={animatedStyles}>
            <Image
              source={{
                uri: data.image,
              }}
              style={
                loadingImage
                  ? {}
                  : {width: undefined, height: undefined, flex: 1}
              }
              resizeMode="center"
              onLoadEnd={() => {
                setloadingImage(false);
                showAnimated();
              }}
            />
          </Animated.View>
        )}

        <View style={{flex: 1}} marginT-8>
          <Text marginL-4 marginV-4 animated style={styles.labelTitle}>
            Detalle del producto:
          </Text>
          <Text marginL-4 marginV-4 animated style={styles.label}>
            Comprado el{' '}
            {format(data?.createdAt ? parseISO(data?.createdAt) : new Date(), 'dd MMMM yyyy')}
          </Text>

          <Text marginL-4 marginV-4 animated style={styles.labelTitle}>
            Con esta compra acumulaste:
          </Text>
          <Text marginL-4 marginV-4 animated style={[styles.label, { fontSize: 20}]}>
            {data?.points.toLocaleString()} puntos
          </Text>
        </View>
      </ScrollView>

      <Button
        label="Aceptar"
        backgroundColor='blue'
        marginH-24
        marginV-24
        disabled={isFetching}
        onPress={props.navigation.goBack}
      />
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    marginTop: 24,
  },
  labelTitle: {
    fontWeight: 'bold',
    color: '#aaa',
  },
  label: {
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
