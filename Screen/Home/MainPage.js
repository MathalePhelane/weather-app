import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native";
import AppImage from "../../Components/image/AppImage";
import AppText from "../../Components/text/AppText";
import AppView from "../../Components/View/AppView";
import { ColorTheme } from "../../Theme/Colors";
import Icon from "../../Components/Icon/Icon";
import api from "../../api/axios";
import * as Location from "expo-location";
import moment from "moment";
import Loading from "../../Components/Loader/Loading";
import Button from "../../Components/Button/Button";
import AppModal from "../../Components/modal/Modal";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainPage = () => {
  const data = [
    {
      title: "Tuesday",
      text: "19",
      icon: require("../../assets/Icons/clear.png"),
    },
    {
      title: "Wednesday",
      text: "19",
      icon: require("../../assets/Icons/clear.png"),
    },
    {
      title: "Thursday",
      text: "19",
      icon: require("../../assets/Icons/clear.png"),
    },

    {
      title: "Friday",
      text: "19",
      icon: require("../../assets/Icons/clear.png"),
    },

    {
      title: "Saturday",
      text: "19",
      icon: require("../../assets/Icons/clear.png"),
    },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [wetherType, setWetherType] = useState([]);
  const [degrees, setDegrees] = useState();
  const [main, setMain] = useState({});
  const [typeNumber, seTypeNumber] = useState({});
  const [forCust, setForCust] = useState([]);
  const [currentTemp, setCurrentTem] = useState();
  const isFirstRun = useRef(true);
  const [loader, setLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [saveLocation, setSaveLocation] = useState([]);
  const [flatlis, setFlatlis] = useState([]);
  const newarr = [];

  useEffect(() => {
    function filterWeatherData() {
      weatherData.filter((data) => {
        const time = moment(data.dt_txt).format("HH:mm:ss");
        if (data.dt_txt.includes("12:00:00")) {
          newarr.push(data);
        }
      });
      console.log("new Array: ", newarr);
    }
    filterWeatherData();
    setForCust(newarr);
  }, [latitude]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLatitude(loc.coords.latitude);
      setLongitude(loc.coords.longitude);
    })();

    const getWeatherLocations = async () => {
      try {
        const data = await AsyncStorage.getItem("weatherLocations");
        if (data !== null) {
          setSaveLocation(JSON.parse(data));
        }
        const names = await AsyncStorage.getItem("locationNames");
        if (names !== null) {
          setFlatlis(JSON.parse(names));
        }
      } catch (error) {
        console.log("Error retrieving weather locations: ", error);
      }
    };

    getWeatherLocations();
    getCurrentWeather();
    getForecustWeather();
  }, []);

  const getCurrentWeather = useCallback(
    () =>
      api
        .get(
          "/data/2.5/weather?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&appid=1b17821f27b85ba92b19e69f1c56e915&units=metric"
        )
        .then((response) => {
          setWetherType(response.data.weather);
          setMain(response.data.main);
          // setLoader(false);
        }),
    [latitude, longitude]
  );
  const getForecustWeather = useCallback(
    () =>
      api
        .get(
          "/data/2.5/forecast?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&appid=1b17821f27b85ba92b19e69f1c56e915&units=metric"
        )
        .then((response) => {
          setWeatherData(response.data.list);
          // setLoader(false);
        }),
    [latitude, longitude]
  );

  const handleModal = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModal2 = () => {
    setOpenModal2(true);
  };

  const handleModalClose2 = () => {
    setOpenModal2(false);
  };

  if (loader) {
    return <Loading />;
  }

  const addWeatherLocation = async (locationPins, formmated_address) => {
    try {
      const { location } = locationPins;
      const updatedLocations = [...saveLocation, location];
      const address = [...flatlis, formmated_address];

      setFlatlis(address);
      setSaveLocation(updatedLocations);

      await AsyncStorage.setItem(
        "weatherLocations",
        JSON.stringify(updatedLocations)
      );

      await AsyncStorage.setItem("locationNames", JSON.stringify(address));

      console.log(
        "Weather location added successfully",
        updatedLocations,
        address
      );
    } catch (error) {
      console.log("Error adding weather location: ", error);
    }
  };

  return (
    <SafeAreaView>
      {wetherType.map((w, i) =>
        w.main === "Clear" ? (
          <AppImage
            key={i}
            image={require("../../assets/Images/forest_sunny.png")}
          >
            {/* <Icon icon={require("../../assets/Icons/clear.png")}/> */}
            <AppText>{Math.round(main.temp) + "°"}</AppText>
            {wetherType?.map((type, index) => (
              <AppText key={index} style={[customeView.text]}>
                {type.main}
              </AppText>
            ))}
          </AppImage>
        ) : w.main === "Clouds" ? (
          <AppImage
            key={i}
            image={require("../../assets/Images/forest_cloudy.png")}
          >
            {/* <Icon icon={require("../../assets/Icons/clear.png")}/> */}
            <AppText>{Math.round(main.temp) + "°"}</AppText>
            {wetherType?.map((type, index) => (
              <AppText key={index} style={[customeView.text]}>
                {type.main}
              </AppText>
            ))}
          </AppImage>
        ) : w.main === "Rain" ? (
          <AppImage
            key={i}
            image={require("../../assets/Images/forest_rainy.png")}
          >
            {/* <Icon icon={require("../../assets/Icons/clear.png")}/> */}
            <AppText>{Math.round(main.temp) + "°"}</AppText>
            {wetherType?.map((type, index) => (
              <AppText key={index} style={[customeView.text]}>
                {type.main}
              </AppText>
            ))}
          </AppImage>
        ) : null
      )}

      <AppView style={customeView.container}>
        {/* {
          main?.map((temp,index) => ( */}

        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <View>
            <AppText style={customeView.text2}>
              {Math.round(main?.temp_min) + "°"}
            </AppText>
            <AppText style={customeView.textypeMin}>min</AppText>
          </View>

          <View>
            <AppText style={customeView.text2}>
              {Math.round(main?.temp) + "°"}
            </AppText>
            <AppText style={customeView.textypeCurrent}>Current</AppText>
          </View>

          <View>
            <AppText style={customeView.text2}>
              {Math.round(main?.temp_max) + "°"}
            </AppText>
            <AppText style={customeView.textypeMax}>Max</AppText>
          </View>
        </View>
        {/* ))
        } */}
      </AppView>
      <AppView style={customeView.view3}>
        {forCust.map((infor, i) => (
          <View
            key={i}
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View>
              <AppText style={customeView.ListText}>
                {moment(infor.dt_txt).format("dddd")}
              </AppText>
            </View>
            <View>
              <Icon
                style={customeView.icon}
                icon={{
                  uri: `https://openweathermap.org/img/w/${infor.weather[0].icon}.png`,
                }}
              />
            </View>
            <View>
              <AppText style={customeView.ListText}>
                {Math.round(infor.main.temp) + "°"}
              </AppText>
            </View>
          </View>
        ))}
        <>
          <View
            style={{ justifyContent: "space-around", flexDirection: "row" }}
          >
            <Button onPress={handleModal} style={customeView.button}>
              <AppText style={customeView.buttonTxt}>View Map</AppText>
            </Button>

            <Button onPress={handleModal2} style={customeView.button}>
              <AppText style={customeView.buttonTxt}>My Fav</AppText>
            </Button>
          </View>

          <AppModal modalVisible={openModal} modalClose={handleModalClose}>
            <AppText style={customeView.buttonTxt}>
              Choose Location to save
            </AppText>

            <GooglePlacesAutocomplete
              fetchDetails={true}
              minLength={3}
              placeholder="Search & Save"
              onPress={(data, details = null) => {
                console.log("saved location", saveLocation);
                // setShortAddress(details.formatted_address);
                if (details) {
                  const { geometry, formatted_address } = details;
                  // saveWeatherData(saveLocation);
                  addWeatherLocation(geometry, formatted_address);
                  alert("Location `Saved");
                } else {
                  alert("Location `Not Saved");
                }
                console.log("list", saveLocation);
              }}
              query={{
                key: "AIzaSyDQ28z-HdfppcOiUJeyb1GqL4oMQieFj9w",
                language: "en",
              }}
              styles={{
                container: {
                  flex: 0,
                  width: "100%",
                  justifyContent: "center",
                  zIndex: 2,
                },
                textInput: {
                  fontSize: 18,
                },
              }}
            />

            <MapView
              style={{
                width: "100%",
                height: "70%",
                marginBottom: 20,
                flex: 1,
              }}
              showsUserLocation={true}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {saveLocation?.map((item, i) => (
                <Marker
                  pinColor={"red"}
                  key={i}
                  coordinate={{
                    latitude: item.lat,
                    longitude: item.lng,
                  }}
                  description={item?.formatted_address}
                  image={require("../../assets/Images/location.png")}
                  // onPress={() => navigation.navigate('Businesses', {clickedItem: item})}
                />
              ))}
            </MapView>
          </AppModal>

          <AppModal modalVisible={openModal2} modalClose={handleModalClose2}>
            <AppText style={customeView.favheading}>
              My Favaourite Locations
            </AppText>
            <FlatList
              data={flatlis}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Pressable style={customeView.touchaBle}>
                  <AppText style={customeView.listtext}>{item}</AppText>
                </Pressable>
              )}
            />
          </AppModal>
        </>
      </AppView>
    </SafeAreaView>
  );
};

const customeView = StyleSheet.create({
  container: {
    marginBottom: 1,
    height: "5%",
  },
  text: {
    fontWeight: "normal",
    bottom: Platform.OS === "android" ? 40 : 32,
    fontSize: 50,
  },
  text2: {
    margin: 8,
    alignSelf: "center",
    fontSize: 15,
    marginBottom: 10,
  },
  textypeMin: {
    // alignSelf: "flex-start",
    alignSelf: "center",
    fontSize: 15,
    bottom: 20,
    margin: 8,
    fontWeight: "normal",
    color: "lightgray",
  },
  textypeCurrent: {
    alignSelf: "center",
    fontSize: 15,
    bottom: 20,
    margin: 8,
    fontWeight: "normal",
    color: "lightgray",
  },
  textypeMax: {
    alignSelf: "flex-end",
    fontSize: 15,
    bottom: 20,
    margin: 8,
    fontWeight: "normal",
  },
  view3: {
    height: "100%",
  },
  ListText: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
  },
  icon: {
    // margin: 10,
    justifyContent:"center",
     alignContent:"center",
     alignSelf:"center"
  },
  buttonTxt: {
    margin: 8,
    alignSelf: "center",
    fontSize: 12,
    marginBottom: 0,
    color: "black",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#0D77DB",
  },
  favheading: {
    margin: 8,
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 0,
    color: "black",
  },
  listtext: {
    margin: 8,
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 0,
    color: "black",
  },
  touchaBle: {
    backgroundColor: ColorTheme.Sunny,
    marginHorizontal: "2%",
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 100,
      color: "gray",
    },
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default MainPage;
