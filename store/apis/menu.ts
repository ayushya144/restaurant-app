import { queryParamsBuilder, removeExtraFields } from "@/utils/commonFuntions";
import { createApiInstance } from "./createApiInstance";

// Define the expected types for Menu and related API queries/mutations
interface Menu {
  _id?: string;
  name: string;
  description: string;
  price: number;
  // Add other menu fields here
}

interface MenuQueryParams {
  [key: string]: any;
}

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getMenus: build.query<Menu[], MenuQueryParams>({
      query: (query) => {
        return `/menu${queryParamsBuilder(query)}`;
      },
    }),
    putPostMenu: build.mutation<Menu, Partial<Menu>>({
      query(body) {
        const filteredData = removeExtraFields(body);
        return {
          url: "/menu" + (body._id ? `/${body._id}` : ""),
          method: body._id ? "PUT" : "POST",
          body: filteredData,
        };
      },
    }),
    deleteMenu: build.mutation<void, string>({
      query(id) {
        return { url: `/menu/${id}`, method: "DELETE" };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMenusQuery,
  usePutPostMenuMutation,
  useDeleteMenuMutation,
} = extendedApi;
