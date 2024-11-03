// import createApiInstance from './createApiInstance';


// interface ContactUs {
//   _id: string;
//   name: string;
//   email: string;
//   message: string;
//   status: string;
// }

// interface ContactUsStatusUpdateRequest {
//   status: string;
//   _id: string;
// }

// interface PostContactUsRequest {
//   name: string;
//   email: string;
//   message: string;
// }


// const queriesApi = createApiInstance.injectEndpoints({

//   endpoints: (build) => ({
//     getAllQueries: build.query<ContactUs[], void>({
//       query: () => '/contact-us',

//     }),

//     putPostContactUs: build.mutation<void, PostContactUsRequest>({
//       query: (data) => ({
//         url: '/contact-us',
//         method: 'POST',
//         body: data,
//       }),
     
//     }),

//     contactUsStatusUpdate: build.mutation<void, ContactUsStatusUpdateRequest>({
//       query: ({ status, _id }) => ({
//         url: `/contact-us/${_id}`,
//         method: 'PATCH',
//         body: { status },
//       }),
     
//     }),
//   }),
// });

// export const {
//     useGetAllQueriesQuery,
//     usePutPostContactUsMutation,
//     useContactUsStatusUpdateMutation,
//   } = queriesApi;
import createApiInstance from './createApiInstance';

interface ContactUs {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
}

interface ContactUsStatusUpdateRequest {
  status: string;
  _id: string;
}

interface PostContactUsRequest {
  name: string;
  email: string;
  message: string;
}

const sampleContactUsData: ContactUs[] = [
  {
    _id: "672773bcd34beb1b2a31b35a",
    name: "Shiv Kadi",
    email: "info@restaurant.com",
    message: "Looking forward to the dinner.",
    status: "New"
  },
  {
    _id: "671f0e7fb27faf3801bba372",
    name: "Charles S.",
    email: "pat@aneesho.com",
    message: "Do you need help with graphic design - brochures, banners, flyers, etc.?",
    status: "Responded"
  },
  {
    _id: "671f0cb5b27faf3801bba370",
    name: "Megan L.",
    email: "megan.l@example.com",
    message: "I'd like to know more about your offerings.",
    status: "Pending"
  },
  {
    _id: "671f0e0ac4f2b38d001bcd12",
    name: "Sara T.",
    email: "sara.t@example.com",
    message: "Please call me back regarding reservations.",
    status: "New"
  },
  {
    _id: "671f1a9bb38daf3805cba481",
    name: "Leo D.",
    email: "leo.d@example.com",
    message: "Interested in discussing menu options.",
    status: "Responded"
  },
 
];

const queriesApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllQueries: build.query<ContactUs[], void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 100)); 
        return { data: sampleContactUsData };
      },
    }),

    putPostContactUs: build.mutation<void, PostContactUsRequest>({
      query: (data) => ({
        url: '/contact-us',
        method: 'POST',
        body: data,
      }),
    }),

    contactUsStatusUpdate: build.mutation<void, ContactUsStatusUpdateRequest>({
      query: ({ status, _id }) => ({
        url: `/contact-us/${_id}`,
        method: 'PATCH',
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetAllQueriesQuery,
  usePutPostContactUsMutation,
  useContactUsStatusUpdateMutation,
} = queriesApi;
