import React from "react";
import BarraSuperior from "./components/BarraSuperior";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideAlert } from "./hooks/useAlert";
import RoutesView from "./views/RoutesView";
import CustomizedSnackbars from "./components/Alert"

function App() {
  return (
    <div>
      <ProvideAlert>
        <ProvideAuth>
          <BarraSuperior />
          <RoutesView />
          <CustomizedSnackbars />
        </ProvideAuth>
      </ProvideAlert>
    </div>
  );
}

export default App;
