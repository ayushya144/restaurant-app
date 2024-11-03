// import { createApiInstance } from './createApiInstance';


// interface Reservation {
//   _id: string;
//   status: string;

// }

// interface PostReservationData {
  
//   name: string;
//   date: string;
//   time: string;
// }

// interface ReservationStatusUpdateData {
//   status: string;
//   _id: string;
// }

// const reservationApi = createApiInstance.injectEndpoints({
//   endpoints: (build) => ({
//     getAllReservation: build.query<Reservation[], void>({
   
//       query: () => '/reservation',
//     }),

//     putPostReservation: build.mutation<Reservation, PostReservationData>({
//       query(data) {
//         return {
//           url: '/reservation',
//           method: 'POST',
//           body: data,
//         };
//       },

//     }),

//     reservationStatusUpdate: build.mutation<Reservation, ReservationStatusUpdateData>({
//       query({ status, _id }) {
//         return {
//           url: `/reservation/${_id}`,
//           method: 'PATCH',
//           body: { status },
//         };
//       },
  
//     }),
//   }),
// });

// export const {
//   useGetAllReservationQuery,
//   usePutPostReservationMutation,
//   useReservationStatusUpdateMutation,
// } = reservationApi;
import { createApiInstance } from './createApiInstance';

const sampleReservations = [
  {
    "_id": "67273cf5d34beb1b2a31b2fe",
    "firstName": "Shiv",
    "lastName": "Kadi",
    "phoneNo": 8849723042,
    "email": "abc@gmail.com",
    "noOfPeople": 6,
    "reservationDate": "2024-11-07T09:05:33.000Z",
    "message": "Request for a special table.",
    "status": "Pending"
  },
  {
    "_id": "6723ddffb27faf3801bba3b2",
    "firstName": "Shiv",
    "lastName": "Kadiwala",
    "phoneNo": 8849723042,
    "email": "abc@gmail.com",
    "noOfPeople": 4,
    "reservationDate": "2024-11-07T19:43:45.000Z",
    "message": "Looking forward to the dinner.",
    "status": "Accepted"
  },
  {
    "_id": "6721ab38e51c4837f4fa1cd1",
    "firstName": "Arjun",
    "lastName": "Singh",
    "phoneNo": 9876543210,
    "email": "arjun.singh@gmail.com",
    "noOfPeople": 3,
    "reservationDate": "2024-11-08T13:15:00.000Z",
    "message": "Celebrating anniversary.",
    "status": "Pending"
  },
  {
    "_id": "6721ab38e51c4837f4fa1cd2",
    "firstName": "Ravi",
    "lastName": "Kumar",
    "phoneNo": 8765432109,
    "email": "ravi.kumar@gmail.com",
    "noOfPeople": 2,
    "reservationDate": "2024-11-08T18:00:00.000Z",
    "message": "Business meeting.",
    "status": "Accepted"
  },
  {
    "_id": "6721ab38e51c4837f4fa1cd3",
    "firstName": "Priya",
    "lastName": "Sharma",
    "phoneNo": 7654321098,
    "email": "priya.sharma@gmail.com",
    "noOfPeople": 5,
    "reservationDate": "2024-11-09T12:30:00.000Z",
    "message": "Family reunion.",
    "status": "Pending"
  },
  {
    "_id": "6721ab38e51c4837f4fa1cd4",
    "firstName": "Vikram",
    "lastName": "Patel",
    "phoneNo": 6543210987,
    "email": "vikram.patel@gmail.com",
    "noOfPeople": 3,
    "reservationDate": "2024-11-09T20:00:00.000Z",
    "message": "Romantic dinner.",
    "status": "Rejected"
  },
  {
    "_id": "6721ab38e51c4837f4fa1cd5",
    "firstName": "Anjali",
    "lastName": "Mehta",
    "phoneNo": 5432109876,
    "email": "anjali.mehta@gmail.com",
    "noOfPeople": 8,
    "reservationDate": "2024-11-10T14:45:00.000Z",
    "message": "Team outing.",
    "status": "Accepted"
  },
  {
    "_id": "6721ab38e51c4837f4fa1cd6",
    "firstName": "Rohan",
    "lastName": "Desai",
    "phoneNo": 4321098765,
    "email": "rohan.desai@gmail.com",
    "noOfPeople": 2,
    "reservationDate": "2024-11-10T19:30:00.000Z",
    "message": "Birthday celebration.",
    "status": "Pending"
  },
  {
    "_id": "6721ab38e51c4837f4fa1cd7",
    "firstName": "Sanjay",
    "lastName": "Verma",
    "phoneNo": 3210987654,
    "email": "sanjay.verma@gmail.com",
    "noOfPeople": 6,
    "reservationDate": "2024-11-11T17:00:00.000Z",
    "message": "Wedding anniversary.",
    "status": "Accepted"
  },
  {
    "_id": "6721ab38e51c4837f4fa1cd8",
    "firstName": "Nisha",
    "lastName": "Kapoor",
    "phoneNo": 2109876543,
    "email": "nisha.kapoor@gmail.com",
    "noOfPeople": 4,
    "reservationDate": "2024-11-11T21:00:00.000Z",
    "message": "Farewell dinner.",
    "status": "Rejected"
  },
  {
    "_id": "6721ab38e51c4837f4fa1cd9",
    "firstName": "Karan",
    "lastName": "Jain",
    "phoneNo": 1098765432,
    "email": "karan.jain@gmail.com",
    "noOfPeople": 7,
    "reservationDate": "2024-11-12T13:00:00.000Z",
    "message": "Family celebration.",
    "status": "Accepted"
  },
  {
    "_id": "6721ab38e51c4837f4fa1cda",
    "firstName": "Sneha",
    "lastName": "Rao",
    "phoneNo": 9988776655,
    "email": "sneha.rao@gmail.com",
    "noOfPeople": 3,
    "reservationDate": "2024-11-12T18:30:00.000Z",
    "message": "Friends gathering.",
    "status": "Pending"
  }
];

const reservationApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllReservation: build.query({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); 
        return { data: sampleReservations }; 
      },
    }),

    putPostReservation: build.mutation({
      query(data) {
        return {
          url: '/reservation',
          method: 'POST',
          body: data,
        };
      },
    }),

    reservationStatusUpdate: build.mutation({
      query({ status, _id }) {
        return {
          url: `/reservation/${_id}`,
          method: 'PATCH',
          body: { status },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllReservationQuery,
  usePutPostReservationMutation,
  useReservationStatusUpdateMutation,
} = reservationApi;
