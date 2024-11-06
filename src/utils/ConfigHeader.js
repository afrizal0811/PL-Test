const GetConfig = () => {
  let token = window.localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

export { GetConfig };
