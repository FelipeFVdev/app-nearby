import { useEffect, useState, useRef } from "react";
import { api } from "@/service/api";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";
import { Alert, Modal, View, StatusBar, ScrollView } from "react-native";
import Loading from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const [data, setData] = useState<DataProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [couponIsFetching, setCoupomIsFetching] = useState(false);

  const [_, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{ id: string }>();

  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get("/markets/" + params.id);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Nao foi possivel carregar os dados.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  }

  async function handleModal() {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert("Camera", "Voce precisa habilitar o uso da camera.");
      }
      qrLock.current = false;
      setIsModalVisible(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Camera", "Nao foi possivel utilizar a camera.");
    }
  }

  async function getCoupon(id: string) {
    try {
      setCoupomIsFetching(true);

      const { data } = await api.patch("/coupons/" + id);

      Alert.alert("Cupom", data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Nao foi possivel obter o cupom.");
    } finally {
      setCoupomIsFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsModalVisible(false);

    Alert.alert(
      "Cupom",
      "Nao e possivel utilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Nao" },
        {
          text: "Sim",
          onPress: () => getCoupon(id),
        },
      ]
    );
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) return <Loading />;

  if (!data) return <Redirect href="/home" />;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isModalVisible} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />

        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleModal}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isModalVisible}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => {
                handleUseCoupon(data);
              }, 1000);
            }
          }}
        />
        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsModalVisible(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
