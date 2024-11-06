import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store";
import AppRouter from "./router/AppRouter";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
