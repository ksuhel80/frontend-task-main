import * as React from "react";
import Sidebar from "../Sidebar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Chart from "react-apexcharts";

import Maps from "./Maps";


export interface IAppProps {}

export default function Charts(props: IAppProps) {
  const { isLoading, data } = useQuery<any>(["day"], () => {
    return axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );
  });

  const { isLoading: isLoad, data: countryData } = useQuery<any>(
    ["country"],
    () => {
      return axios.get("https://disease.sh/v3/covid-19/countries");
    }
  );

  const { isLoading: Loadall, data: alldata } = useQuery<any>(["all"], () => {
    return axios.get("https://disease.sh/v3/covid-19/all");
  });

  const [series, setSeries] = React.useState<any>([]);


 

  React.useEffect(() => {
    if (!isLoading) {
      console.log(data);
      setSeries([
        {
          name: "cases",
          data: [...Object.values(data.data.cases)],
        },
        {
          name: "deaths",
          data: [...Object.values(data.data.deaths)],
        },
        {
          name: "recovered",
          data: [...Object.values(data.data.recovered)],
        },
      ]);
    }
  }, [data,isLoading]);

  React.useEffect(() => {
    if (alldata) {
      // console.log(alldata.data);
    }
  }, [alldata]);

  return (
    <div className="flex w-[100%]">
      <div className="  h-[100vh] min-w-fit hidden sm:block fixed  ">
        <Sidebar />
      </div>

      <div className="w-[85%] ml-48 flex items-center justify-center flex-wrap">
      
      <div className="my-10 h-[50vh]"> {series.length > 0 ? (
          <Chart
            type="line"
            width={'300%'}
            height={'100%'}
            series={series}
            zoom={{ type: "x", enabled: true, autoScaleYaxis: true }}
            toolbar={{
              autoSelected: "zoom",
            }}
            options={{
              title: { text: "Covid Cases" },
              xaxis: {
                type: "datetime",
                title: { text: "date" },
                categories: Object.keys(data.data.cases),
              },
            }}
          ></Chart>
        ) : (
          <div>Loading...</div>
        )}</div>

       

<div className="mb-6 w-full"><Maps /></div>
      </div>
    </div>
  );
}
