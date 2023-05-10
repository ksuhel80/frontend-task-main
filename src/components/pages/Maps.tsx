import * as React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Icon, divIcon, point } from "leaflet";
export interface IAppProps {
}


//
const customIcon = new Icon({
  iconUrl: require("../../placeholder.png"),
  iconSize: [18, 18], // size of the icon
});
export default function Maps (props: IAppProps) {
  const { isLoading: isLoad, data: countryData } = useQuery<any>(
    ["country"],
    () => {
      return axios.get("https://disease.sh/v3/covid-19/countries");
    }
  );
 const [markers, setMarkers] = React.useState<any>([]);
  React.useEffect(() => {

   
    if (!isLoad) {
      console.log(countryData);

      const markers1 = countryData.data.map((item: any) => {
        return {
          geocode: [item.countryInfo.lat, item.countryInfo.long],
          popUp: `${item.country} \n Total cases : ${item.cases} \n Active cases: ${item.active} \n Recovered: ${item.recovered} \n Deaths:${item.deaths}`,
        };
      });
      // console.log(markers1)
      setMarkers(markers1);
    }
  }, [countryData,isLoad]);

  if(isLoad)
  {
    return <div>Loading...</div>
  }
  return (
    
       <MapContainer style={{height: '90vh', width:'90%', margin: 10 }} center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
       {countryData.data.map((item: any) => 
        (
                <Marker position={[item.countryInfo.lat, item.countryInfo.long]} icon={customIcon}>
                  <Popup>{`${item.country} \n Total cases : ${item.cases} \n Active cases: ${item.active} \n Recovered: ${item.recovered} \n Deaths:${item.deaths}`}</Popup>
                </Marker>
              ))}
  </MapContainer>
  
  );
}
