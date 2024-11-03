import {
  useGetAllReservationQuery,
  useReservationStatusUpdateMutation,
} from "@/store/apis/reservation";
import React, { useState } from "react";
import { SafeAreaView, FlatList, View } from "react-native";
import {
  Modal,
  Portal,
  Button,
  Text,
  Card,
  Avatar,
  Divider,
  useTheme,
} from "react-native-paper";

const Reservation = () => {
  const { data: reservations, isLoading } = useGetAllReservationQuery();
  const [visible, setVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [approveReservation] = useReservationStatusUpdateMutation();
  const [rejectReservation] = useReservationStatusUpdateMutation();
  const theme = useTheme();

  const showModal = (reservation: any) => {
    setSelectedReservation(reservation);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setSelectedReservation(null);
  };

  const handleApprove = async () => {
    if (selectedReservation) {
      await approveReservation({
        status: "Accepted",
        _id: selectedReservation._id,
      });
      hideModal();
    }
  };

  const handleReject = async () => {
    if (selectedReservation) {
      await rejectReservation({
        status: "Rejected",
        _id: selectedReservation._id,
      });
      hideModal();
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <Card
      mode="elevated"
      style={{
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: 12,
      }}
      onPress={() => showModal(item)}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Text
          size={40}
          label={`${item.firstName.charAt(0)}`}
          style={{ backgroundColor: theme.colors.primaryContainer }}
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.primary, fontWeight: "bold" }}
          >
            {`${item.firstName} ${item.lastName}`}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Date: {new Date(item?.reservationDate).toLocaleString()}
          </Text>
        </View>
      </View>
      <Divider style={{ marginVertical: 8 }} />
      <Text style={{ fontSize: 14, color: theme.colors.onSurface }}>
        People: {item.noOfPeople}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "bold",
          color: theme.colors.primary,
        }}
      >
        Status: {item.status}
      </Text>
    </Card>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={reservations}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingTop: 26 }}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: theme.colors.surface,
            borderRadius: 10,
            padding: 20,
            margin: 20,
          }}
        >
          {selectedReservation && (
            <>
              <Text
                variant="titleMedium"
                style={{ fontWeight: "bold", color: theme.colors.primary }}
              >
                {selectedReservation.firstName} {selectedReservation.lastName}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface }}
              >
                Phone: {selectedReservation.phoneNo}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface }}
              >
                Email: {selectedReservation.email}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface }}
              >
                Message: {selectedReservation.message}
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginVertical: 8,
                }}
              >
                Reservation Date:{" "}
                {new Date(
                  selectedReservation?.reservationDate
                ).toLocaleString()}
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurface }}
              >
                People: {selectedReservation?.noOfPeople}
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurface }}
              >
                Status: {selectedReservation?.status}
              </Text>
              <Divider style={{ marginVertical: 10 }} />
              <Button
                mode="contained"
                onPress={handleApprove}
                style={{ marginTop: 10 }}
              >
                Approve
              </Button>
              <Button
                mode="outlined"
                onPress={handleReject}
                style={{ marginTop: 10 }}
              >
                Reject
              </Button>
            </>
          )}
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default Reservation;
