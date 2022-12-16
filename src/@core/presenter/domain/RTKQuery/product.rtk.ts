import API from '@presenter/io/config';
import {setShowToast} from '@presenter/io/toastSlice';
import {Incubator} from 'react-native-ui-lib';
import {ProductEntity} from '../entity/product.entity';
import {baseApi} from './base.rtk';

export const productApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllProduct: build.query<ProductEntity[], void>({
      query: () => `${API.endpoints.getAllProduct}`,
      async onQueryStarted(arg, {dispatch}) {
        dispatch(
          setShowToast({
            variant: Incubator.ToastPresets.SUCCESS,
            message: 'Get all',
            position: 'top',
          }),
        );
      },
    }),
    getProductById: build.query<ProductEntity, string>({
      query: id => `${API.endpoints.getAllProduct}/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetAllProductQuery, useGetProductByIdQuery} = productApi;
