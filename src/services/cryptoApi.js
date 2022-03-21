import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '497e59a0b6msh106b71282a8be25p11a423jsn3101e61b6e8f'
}

const baseUrl = "https://coinranking1.p.rapidapi.com";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl
  }),  
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => ( {url: `/coins?limit=100`, headers: cryptoApiHeaders})
    })
  })
})


export const {
  useGetCryptosQuery,
} = cryptoApi;

// var options = {

//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl',
//     limit: '50',
//     offset: '0',
//     orderBy: '24hVolume',
//     orderDirection: 'desc'
//   },
//   headers: {
//     'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//     'x-rapidapi-key': '497e59a0b6msh106b71282a8be25p11a423jsn3101e61b6e8f'
//   }
// };
