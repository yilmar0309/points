import React from 'react';
import {FlatList, ListRenderItem, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Props} from '@navigation/InjectInterface';
import {useHookHome} from './hookScreen';
import Card from '@components/Card/Card';
import {ProductEntity} from '@presenter/domain/entity/product.entity';
import {Button, Text, View} from 'react-native-ui-lib';

const HomeScreen: React.FC<Props> = () => {
  const {data, refreshing, total, filter, onRefresh, handleFilter} =
    useHookHome();

  const renderItem: ListRenderItem<ProductEntity> = ({item}) => (
    <Card item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <Text style={styles.title}>Bienvenido de vuelta!</Text>
        <Text marginB-12>Alexis Noriega</Text>

        <Text style={styles.textTitle}>TUS PUNTOS</Text>
        <View style={styles.boxPoints}>
          <Text marginL-4 color="white" style={{fontWeight: 'bold'}}>
            Diciembre
          </Text>
          <Text marginL-4 style={styles.textTotal}>
            {total.toLocaleString()} pts
          </Text>
        </View>

        <Text style={styles.textTitle}>TUS MOVIMIENTOS</Text>
        <View style={styles.boxList}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={styles.list}
          />
        </View>
      </ScrollView>
      {filter ? (
        <View row spread marginB-12>
          <Button
            label="Todos"
            style={{width: '100%'}}
            backgroundColor="blue"
            onPress={() => handleFilter('')}
          />
        </View>
      ) : (
        <View row spread marginB-12>
          <Button
            label="Ganados"
            style={styles.button}
            backgroundColor="blue"
            onPress={() => handleFilter('ganados')}
          />
          <Button
            label="Cangeados"
            style={styles.button}
            backgroundColor="blue"
            onPress={() => handleFilter('cangeados')}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  boxList: {
    height: 400,
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
  },
  textTitle: {
    color: '#aaa',
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  boxPoints: {
    backgroundColor: 'blue',
    width: '70%',
    height: 120,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    borderRadius: 8,
    elevation: 8,
  },
  textTotal: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
  },
  button: {
    width: '45%',
  },
});
