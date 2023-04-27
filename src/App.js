import EmployeeList from "./Component/EmployeeList";
import EmployeeContextProvider from "./context/EmployeeContext";

import "./App.css";

function App() {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <EmployeeContextProvider>
            <EmployeeList />
          </EmployeeContextProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
