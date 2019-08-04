import axios from "axios";

export const requestLocationData = location => {
    return axios.get(`https://api.openaq.org/v1/latest?location=${location}`);
};

export const getAllLocations = () => {
    return axios.get(
        "https://api.openaq.org/v1/locations?country[]=GB&limit=10000"
    );
};
