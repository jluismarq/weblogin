import React from "react";
import BarraSuperior from "./components/BarraSuperior";
import { ProvideAuth } from "./hooks/useAuth";
import RoutesView from "./views/RoutesView";

function App() {
  return (
    <div>
      <ProvideAuth>
        <BarraSuperior />
        <RoutesView />
      </ProvideAuth>
    </div>
  );
}

export default App;
