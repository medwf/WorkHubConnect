"use server"
import axios from "axios";
import toast from "react-hot-toast";

export const fetchWorkers = async (
  page: number,
  selectedService: { id: number } | null,
  selectedRegion: { id: number } | null,
  selectedCity: { id: number } | null
) => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/workers_search", {
      params: {
        page: page,
        limit: 10,
        service: selectedService?.id,
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
            "http://localhost:5000/api/v1/services"
        );
        const services = response.data;
        return services;


    } catch (error:any) {
      console.error("Error fetching workers:", error);
        
        
    }
}