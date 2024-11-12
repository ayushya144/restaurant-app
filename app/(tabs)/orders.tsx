import { useGetAllOrdersQuery } from "@/store/apis/orders";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";

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
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetAllOrdersQuery({});

  console.log({ data });

  const orders: Order[] = data || [];

  const openOrderDetails = (order: Order) =>
    setSelectedOrder({ order, isModalOpen: true });
  const closeOrderDetails = () => {
    setSelectedOrder({ order: selectedOrder?.order, isModalOpen: false });
    setTimeout(
      () =>
        setSelectedOrder({
          order: null,
          isModalOpen: false,
        }),
      500
    );
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.orderOverview}
      onPress={() => openOrderDetails(item)}
    >
      <Text style={styles.orderText}>
        Customer: {item.customerDetails.firstName}{" "}
        {item.customerDetails.lastName}
      </Text>
      <Text style={styles.orderText}>
        Date: {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.orderText}>Total: ${item.totalPrice.toFixed(2)}</Text>
      <Text style={[styles.orderText, styles.status]}>{item.status}</Text>
    </TouchableOpacity>
  );

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.item.itemImagePath }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.item.itemName}</Text>
        <Text style={styles.itemPrice}>
          ${item.item.itemPrice.toFixed(2)} x {item.quantity}
        </Text>
        <Text style={styles.itemTotal}>
          Total: ${(item.item.itemPrice * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const orderDetail = selectedOrder?.order;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderOrder}
      />

      <Modal
        visible={selectedOrder?.isModalOpen}
        animationType="fade"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {orderDetail && (
              <>
                <Text style={styles.customerName}>
                  {orderDetail.customerDetails.firstName}{" "}
                  {orderDetail.customerDetails.lastName}
                </Text>
                <Text style={styles.customerContact}>
                  Email: {orderDetail.customerDetails.email}
                </Text>
                <Text style={styles.customerContact}>
                  Phone: {orderDetail.customerDetails.phoneNo}
                </Text>
                <Text style={styles.orderDate}>
                  Order Date:{" "}
                  {new Date(orderDetail.createdAt).toLocaleDateString()}
                </Text>

                <FlatList
                  data={orderDetail.cart}
                  keyExtractor={(cartItem) => cartItem.item._id}
                  renderItem={renderCartItem}
                  //   style={styles.cartList}
                />

                <View style={styles.orderSummary}>
                  <Text style={styles.orderStatus}>
                    Status: {orderDetail.status}
                  </Text>
                  <Text style={styles.totalPrice}>
                    Total Price: ${orderDetail.totalPrice.toFixed(2)}
                  </Text>
                </View>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeOrderDetails}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  orderOverview: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  orderText: {
    fontSize: 14,
    color: "#333",
  },
  status: {
    fontWeight: "bold",
    color: "#28a745",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    maxHeight: "80%",
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  customerContact: {
    fontSize: 14,
    color: "#555",
  },
  orderDate: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 13,
    color: "#777",
  },
  itemTotal: {
    fontSize: 13,
    color: "#777",
    fontWeight: "bold",
    marginTop: 3,
  },
  orderSummary: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "600",
    color: "#28a745",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e63946",
  },
  closeButton: {
    backgroundColor: "#e63946",
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Orders;
