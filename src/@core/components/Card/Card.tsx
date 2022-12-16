import {ProductEntity} from '@presenter/domain/entity/product.entity';
import {useNavigation} from '@react-navigation/native';
import {format, parseISO} from 'date-fns';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Card as CardUI, Image, Text, View} from 'react-native-ui-lib';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  item: ProductEntity;
}

const Card = ({item}: Props) => {
  const navigation: any = useNavigation();

  return (
    <CardUI
      flex
      row
      centerV
      paddingV-4
      paddingH-4
      onPress={() => navigation.navigate('DetailScreen', {id: item.id})}>
      <Image
        source={{uri: item?.image}}
        width={64}
        height={64}
        style={{borderRadius: 4}}
      />
      <View style={styles.box} spread paddingV-8 marginL-4>
        <Text marginL-4 style={styles.text}>
          {item?.product}
        </Text>
        <Text marginL-4>
          {format(parseISO(item?.createdAt), 'dd MMMM yyyy')}
        </Text>
      </View>
      <View row centerV>
        <Text
          marginL-4
          color={item.is_redemption ? 'red' : 'green'}
          style={styles.text}>
          {item?.is_redemption ? '-' : '+'}
        </Text>
        <Text marginL-4 style={styles.text}>
          {item?.points}
        </Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
      </View>
    </CardUI>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: '100%',
  },
  text: {fontWeight: 'bold'},
});

export default Card;
