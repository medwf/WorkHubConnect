"use server"
import axios from "axios";
import https from "https"; // Import the https module

import domain from "@/helpers/constants";

export const fetchWorkers = async (
  page: number,
  selectedService: string,
  selectedRegion: { id: number } | null,
  selectedCity: { id: number } | null
) => {
  try {
    const response = await axios.get(`${domain}/api/v1/workers_search`, {
      params: {
        page: page,
        limit: 2,
        service: selectedService,
        state: selectedRegion?.id,
        city: selectedCity?.id,
      },
  
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    // console.log(response);
    const data = await response.data;
    return data;
  } catch (error: any) {
    // console.error("Error fetching workers:", error);
   
  }
};

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${domain}/api/v1/services`,
    {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    }
    );
    const services = response.data;
    return services;
  } catch (error: any) {
    // console.error("Error fetching services", error);
    
  }
};


export const PopularServices = async () => {
  try {
    const response = await axios.get(`${domain}/api/v1/popular_services`, {
      params: {
    
        limit: 5,
       
      },
  
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    // console.log(response);
    const data = await response.data;
    return data;
  } catch (error: any) {
    // console.error("Error fetching workers:", error);
   
  }
};