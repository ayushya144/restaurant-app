import { useGetAllOrdersQuery } from "@/store/apis/orders";
import React, { useState } from "react";
import { SafeAreaView, FlatList, View, Image } from "react-native";
import {
  Card,
  Text,
  Avatar,
  Provider as PaperProvider,
  Portal,
  Modal,
  Button,
  Divider,
  Chip,
  useTheme,
} from "react-native-paper";

interface Item {
  _id: string;
  itemName: string;
  itemPrice: number;
  itemImagePath: string;
}

interface CartItem {
  item: Item;
  quantity: number;
}

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
}

interface Order {
  _id: string;
  cart: CartItem[];
  customerDetails: CustomerDetails;
  status: string;
  createdAt: string;
  totalPrice: number;
}

interface SelectedOrder {
  order: Order | null;
  isModalOpen: boolean;
}

const Orders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<SelectedOrder>({
    order: null,
    isModalOpen: false,
  });
  const { data } = useGetAllOrdersQuery({});
  const orders: Order[] = data || [];
  const theme = useTheme();

  const openOrderDetails = (order: Order) =>
    setSelectedOrder({ order, isModalOpen: true });
  const closeOrderDetails = () => {
    setSelectedOrder({ order: selectedOrder.order, isModalOpen: false });
    setTimeout(
      () => setSelectedOrder({ order: null, isModalOpen: false }),
      500
    );
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <Card
      mode="elevated"
      style={{
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: 12,
      }}
      onPress={() => openOrderDetails(item)}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Text
          size={40}
          label={item.customerDetails.firstName.charAt(0)}
          style={{ backgroundColor: theme.colors.primaryContainer }}
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.primary, fontWeight: "bold" }}
          >
            {`${item.customerDetails.firstName} ${item.customerDetails.lastName}`}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Date: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <Chip
          mode="flat"
          style={{
            backgroundColor:
              item.status === "Completed"
                ? theme.colors.secondary
                : item.status === "Pending"
                ? theme.colors.tertiary
                : theme.colors.error,
            height: 28,
            alignItems: "center",
            justifyContent: "center",
          }}
          textStyle={{
            fontSize: 11,
            color: theme.colors.onPrimary,
            lineHeight: 14,
            fontWeight: "bold",
          }}
        >
          {item.status}
        </Chip>
      </View>

      <Divider style={{ marginVertical: 8 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 16,
            color: theme.colors.onSurface,
            fontWeight: "bold",
          }}
        >
          Total: ${item.totalPrice.toFixed(2)}
        </Text>
      </View>
    </Card>
  );

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={{ flexDirection: "row", marginVertical: 8 }}>
      <Image
        source={{ uri: item.item.itemImagePath }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 8,
          marginRight: 10,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {item.item.itemName}
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            color: theme.colors.onSurfaceVariant,
          }}
        >
          ${item.item.itemPrice.toFixed(2)} x {item.quantity}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ fontWeight: "bold", color: theme.colors.onSurface }}
        >
          Total: ${(item.item.itemPrice * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const orderDetail = selectedOrder.order;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingTop: 26 }}
      />

      <Portal>
        <Modal
          visible={selectedOrder.isModalOpen}
          onDismiss={closeOrderDetails}
          contentContainerStyle={{
            backgroundColor: theme.colors.surface,
            borderRadius: 10,
            padding: 20,
            margin: 20,
          }}
        >
          {orderDetail && (
            <>
              <Text
                variant="titleMedium"
                style={{ fontWeight: "bold", color: theme.colors.primary }}
              >
                {orderDetail.customerDetails.firstName}{" "}
                {orderDetail.customerDetails.lastName}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface }}
              >
                Email: {orderDetail.customerDetails.email}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface }}
              >
                Phone: {orderDetail.customerDetails.phoneNo}
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginVertical: 8,
                }}
              >
                Order Date:{" "}
                {new Date(orderDetail.createdAt).toLocaleDateString()}
              </Text>

              <FlatList
                data={orderDetail.cart}
                keyExtractor={(cartItem) => cartItem.item._id}
                renderItem={renderCartItem}
              />
              <Divider style={{ marginVertical: 10 }} />
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.tertiary,
                    fontWeight: "bold",
                  }}
                >
                  Status: {orderDetail.status}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.colors.error,
                    fontWeight: "bold",
                  }}
                >
                  Total Price: ${orderDetail.totalPrice.toFixed(2)}
                </Text>
              </View>
            </>
          )}
          <Button
            mode="contained"
            onPress={closeOrderDetails}
            style={{ backgroundColor: theme.colors.error, marginTop: 15 }}
          >
            Close
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default Orders;
