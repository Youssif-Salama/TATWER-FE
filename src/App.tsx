import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Contract from "./pages/Contract";
import CreateContractAddress from "./components/contracts/createAddress/CreateContractAddress";
import CreateContractFiles from "./components/contracts/createFiles/CreateContractFiles";
import AllContracts from "./components/contracts/allContracts/AllContracts";
import Create from "./components/contracts/createContract/Create";
import CreateContract from "./components/contracts/createContract/CreateContract";
import Systems from "./pages/Systems";
import Settings from "./pages/Settings";
import TaxCollection from "./components/settings/tax/TaxCollection";
import PaymentCollection from "./components/settings/ payment/ PaymentCollection";
import Estate from "./pages/Estate";
import AllEstates from "./components/estates/allEstates/AllEstates";
import Create2 from "./components/estates/createEstate/Create2";
import CreateEstate from "./components/estates/createEstate/CreateEstate";
import CreateEstateAddress from "./components/estates/createAddress/CreateEstateAddress";
import { CreateEstateFiles } from "./components/estates/createFiles/CreateEstateFiles";
import Login from "./auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import LoginRoute from "./LoginRoute";
import Employee from "./pages/Employee";
import Todo from "./pages/Todo";
import TodoAdd from "./components/todo/add/TodoAdd";
import TodoDisplay from "./components/todo/display/TodoDisplay";
import AdminTodoRoute from "./components/todo/AdminTodoRoute";
import Tasks from "./pages/Tasks";
import MyDynamicTask from "./pages/MyDynamicTask";
import DynamicUnite from "./pages/DynamicUnite";
import DynamicLandlordUnites from "./pages/DynamicLandlordUnites";
import Signup from "./auth/Signup";
import Password from "./pages/Password";
import NewPasswordForm from "./auth/resetPassword/NewPasswordForm";
import ResetPasswordForm from "./auth/resetPassword/ResetPasswordForm";
import ObjectsCollection from "./components/settings/objects/ObjectsCollection";
import ProfileCollection from "./components/settings/profile/ProfileCollection";
import RemindingsCollection from "./components/settings/remindings/RemindingsCollection";
import SystemPrint from "./pages/SystemPrint";
import Reports from "./pages/Reports";
import ContractMain from "./components/reports/components/contracts/ContractMain";
import TenantsMain from "./components/reports/components/tenants/TenantsMain";
import LandlordsMain from "./components/reports/components/landlords/LandlordsMain";
import EstateMain from "./components/reports/components/estates/EstateMain";
import OneEstateMain from "./components/reports/components/estate/main/OneEstateMain";
import Earnings from "./components/reports/components/earnings/Earnings";
import Employees from "./components/settings/employees/Employees";
import DynamicContractPdf from "./methods/reports/DynamicContractPdf";
import DynamicContractExcel from "./methods/reports/DynamicContractExcel";
import TasksOrders from "./components/tasks/tasksOrder/TasksOrders";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Home />} />
              <Route path="/settings/emp" element={<Employee />} />
              <Route path="/reports" element={<Reports/>}>
              </Route>
              <Route path="/reports/contracts" element={<ContractMain/>}></Route>
              <Route path="/reports/contracts/pdf" element={<DynamicContractPdf/>}></Route>
              <Route path="/reports/contracts/excel" element={<DynamicContractExcel/>}></Route>
              <Route path="/reports/tenants" element={<TenantsMain/>}></Route>
              <Route path="/reports/landlords" element={<LandlordsMain/>}></Route>
              <Route path="/reports/estates" element={<EstateMain />} />
              <Route path="/reports/estate" element={<OneEstateMain />} />
              <Route path="/reports/earnings" element={<Earnings />} />
              <Route path="/tasks" element={<Tasks />} >
              </Route>
              <Route path="/tasks/:id" element={<MyDynamicTask />}></Route>
              <Route path="/tasks/orders" element={<TasksOrders />}></Route>
              <Route path="/unites/tenants/:id" element={<DynamicUnite />}></Route>
              <Route path="/unites/landlords/:id" element={<DynamicLandlordUnites />}></Route>
              <Route path="/todo" element={<AdminTodoRoute><Todo /></AdminTodoRoute>} >
              <Route index element={<TodoAdd />}></Route>
              <Route path="tasks" element={<TodoDisplay />}></Route>
              </Route>
              <Route path="systems" element={<Systems />} />
              <Route path="systems/print" element={<SystemPrint />} />
              <Route path="settings" element={<Settings />}>
                <Route index element={<TaxCollection />} />
                <Route path="payment" element={<PaymentCollection />} />
                <Route path="objects" element={<ObjectsCollection />} />
                <Route path="profile" element={<ProfileCollection />} />
                <Route path="remindings" element={<RemindingsCollection />} />
                <Route path="employees" element={<Employees />} />
              </Route>
              <Route path="contracts" element={<Contract />}>
                <Route index element={<AllContracts />} />
                <Route path="create" element={<Create />}>
                  <Route index element={<CreateContract />} />
                  <Route path="address" element={<CreateContractAddress />} />
                  <Route path="files" element={<CreateContractFiles />} />
                </Route>
              </Route>
              <Route path="estates" element={<Estate />}>
                <Route index element={<AllEstates />} />
                <Route path="create" element={<Create2 />}>
                  <Route index element={<CreateEstate />} />
                  <Route path="address" element={<CreateEstateAddress />} />
                  <Route path="files" element={<CreateEstateFiles />} />
                </Route>
              </Route>
            </Route>
          <Route path="/login" element={<LoginRoute><Login /></LoginRoute>}></Route>
          <Route path="/register" element={<LoginRoute><Signup /></LoginRoute>}></Route>
          <Route path="/reset-password" element={<LoginRoute><Password /></LoginRoute>}>
              <Route path=":token" element={<NewPasswordForm/>}/>
              <Route index element={<ResetPasswordForm/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
