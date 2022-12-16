import {ProductEntity} from '@presenter/domain/entity/product.entity';
import {useGetAllProductQuery} from '@presenter/domain/RTKQuery/product.rtk';
import {useEffect, useState} from 'react';

export const useHookHome = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');
  const [data, setData] = useState<ProductEntity[]>([]);
  const {data: dataProduct = [], isFetching, refetch} = useGetAllProductQuery();

  useEffect(() => {
    if (dataProduct.length > 0) {
      let count = 0;
      setData(dataProduct);
      dataProduct.map((e: ProductEntity) => {
        count = count + e.points;
      });
      setTotal(count);
    }
  }, [dataProduct]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleFilter = (key: string) => {
    if (key) {
      setFilter(key);
      setData(
        key === 'cangeados'
          ? dataProduct.filter((e: ProductEntity) => e.is_redemption)
          : dataProduct.filter((e: ProductEntity) => !e.is_redemption),
      );
    } else {
      setFilter('');
      setData(dataProduct);
    }
  };

  return {
    data,
    isFetching,
    refreshing,
    total,
    filter,
    onRefresh,
    handleFilter,
  };
};
