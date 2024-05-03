export const fetchWithToken = async (url, token, options = {}) => {
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });
  return response;
};
// https://api.2290onlineform.com/api/business.getBusinessById?id={id}
