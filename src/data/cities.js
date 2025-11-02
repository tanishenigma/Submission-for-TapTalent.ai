export const cities = [
  { id: 2643743, name: "London", country: "GB" },
  { id: 1850144, name: "Tokyo", country: "JP" },
  { id: 1273294, name: "Delhi", country: "IN" },
  { id: 5128581, name: "New York", country: "US" },
  { id: 2988507, name: "Paris", country: "FR" },
  { id: 2147714, name: "Sydney", country: "AU" },
  { id: 6167865, name: "Toronto", country: "CA" },
  { id: 2950159, name: "Berlin", country: "DE" },
  { id: 1880252, name: "Singapore", country: "SG" },
  { id: 3369157, name: "Cape Town", country: "ZA" },
  { id: 3117735, name: "Madrid", country: "ES" },
  { id: 2759794, name: "Amsterdam", country: "NL" },
  { id: 3169070, name: "Rome", country: "IT" },
  { id: 1275339, name: "Mumbai", country: "IN" },
  { id: 5368361, name: "Los Angeles", country: "US" },
  { id: 1816670, name: "Beijing", country: "CN" },
  { id: 3451190, name: "Rio de Janeiro", country: "BR" },
  { id: 292223, name: "Dubai", country: "AE" },
  { id: 524901, name: "Moscow", country: "RU" },
  { id: 2267057, name: "Lisbon", country: "PT" },
];

export const getRandomCities = (count = 10) => {
  const shuffled = [...cities].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, cities.length));
};

export const getCityById = (id) => {
  return cities.find((city) => city.id === id);
};

export const searchCities = (query) => {
  const lowerQuery = query.toLowerCase();
  return cities.filter(
    (city) =>
      city.name.toLowerCase().includes(lowerQuery) ||
      city.country.toLowerCase().includes(lowerQuery)
  );
};

export default cities;
