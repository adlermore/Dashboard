import "@/styles/globals.scss";
import { Provider } from 'react-redux';
import store from '../redux/store'; // Import your Redux store

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}