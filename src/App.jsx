import { Provider } from "react-redux";
import { Catalog } from "./components/Catalog/Catalog.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { Header } from "./components/Header/Header.jsx";
import { Navigation } from "./components/Navigation/Navigation.jsx";
import { store } from "./store/index.js";

export const App = () => {

  return (
    <Provider store={store}>
      <Header />
      <main>
        <Navigation />
        <Catalog />
      </main>
      <Footer />
    </Provider>
  );
}
