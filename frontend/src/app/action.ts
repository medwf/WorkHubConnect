"use server"
import axios from "axios";
import toast from "react-hot-toast";
import domain from "@/helpers/constants";

export const fetchWorkers = async (
  page: number,
  selectedService: string,
  selectedRegion: { id: number } | null,
  selectedCity: { id: number } | null
) => {
  console.log(domain)
  try {
    const response = await axios.get(`${domain}/api/v1/workers_search`, {
      params: {
        page: page,
        limit: 10,
        service: selectedService,
        state: selectedRegion?.id,
        city: selectedCity?.id,
      },
    });
    const data = await response.data;
    return data;
  } catch (error: any) {
    console.error("Error fetching workers:", error);
   
  }
};

export const fetchServices = async () => {
    try {
        const response = await axios.get(
            `${domain}/api/v1/services`
        );
        const services = response.data;
        return services;


    } catch (error:any) {
      console.error("Error fetching workers:", error);
        
        
    }
}