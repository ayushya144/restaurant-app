import React, { useState, useEffect } from "react";
import {
  useGetAllQueriesQuery,
  useContactUsStatusUpdateMutation,
} from "@/store/apis/queries";
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

const Queries = () => {
  const { data: queriesData, isLoading } = useGetAllQueriesQuery();
  const [queries, setQueries] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<any>(null);
  const [respondToQuery] = useContactUsStatusUpdateMutation();
  const theme = useTheme();

  useEffect(() => {
    if (queriesData) {
      setQueries(queriesData); // Initialize the local state with data from the API
    }
  }, [queriesData]);

  const showModal = (query: any) => {
    setSelectedQuery(query);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setSelectedQuery(null);
  };

  const handleRespond = async () => {
    if (selectedQuery) {
      await respondToQuery({
        status: "Responded",
        _id: selectedQuery._id,
      });

      setQueries((prevQueries) =>
        prevQueries.map((query) =>
          query._id === selectedQuery._id
            ? { ...query, status: "Responded" }
            : query
        )
      );

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
          label={`${item.name.charAt(0)}`}
          style={{ backgroundColor: theme.colors.primaryContainer }}
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.primary, fontWeight: "bold" }}
          >
            {item.name}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Email: {item.email}
          </Text>
        </View>
      </View>
      <Divider style={{ marginVertical: 8 }} />
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
        data={queries}
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
          {selectedQuery && (
            <>
              <Text
                variant="titleMedium"
                style={{ fontWeight: "bold", color: theme.colors.primary }}
              >
                {selectedQuery.name}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface }}
              >
                Email: {selectedQuery.email}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface }}
              >
                Message: {selectedQuery.message}
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginVertical: 8,
                }}
              >
                Status: {selectedQuery.status}
              </Text>
              <Divider style={{ marginVertical: 10 }} />
              <Button
                mode="contained"
                onPress={handleRespond}
                style={{ marginTop: 10 }}
              >
                Respond
              </Button>
            </>
          )}
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default Queries;
