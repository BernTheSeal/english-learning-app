import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

const noTokenRequiredUrls = ['/api/auth'];

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    const payload = JSON.parse(jsonPayload);
    const now = Math.floor(Date.now() / 1000);
    return payload.exp <= now;
  } catch (error) {
    return true;
  }
};

api.interceptors.request.use(async (config) => {
  if (noTokenRequiredUrls.some((url) => config.url.startsWith(url))) {
    return config;
  }

  const storeModule = await import('../redux/store');
  const store = storeModule.store;
  const state = store.getState();
  let accessToken = state.auth.accessToken;

  if (isTokenExpired(accessToken)) {
    try {
      const authSliceModule = await import('../redux/auth/authSlice');
      const { refreshAccessToken, logoutUser } = authSliceModule;
      const result = await store.dispatch(refreshAccessToken());

      if (!result.payload.data) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
      } else {
        accessToken = result.payload.data;
        config.headers.Authorization = `Bearer ${accessToken}`;
        await api(config);
      }
    } catch (error) {
      console.error(error.message);
    }
  } else {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response);
  },
);

export default api;
