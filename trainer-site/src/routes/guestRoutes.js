import AccountCircle from "@material-ui/icons/AccountCircle";
import Group from "@material-ui/icons/Group";
import Home from "@material-ui/icons/Home";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Authenticate from "views/Authenticate/Authenticate.jsx";
import TrainingDashboard from "views/TrainingDashboard/TrainingDashboard.jsx";

export default [
  {
    path: "főoldal",
    name: "Főoldal",
    rtlName: "لوحة القيادة",
    icon: Home,
    component: DashboardPage,
    layout: "/"
  },
  {
    path: "rólunk",
    name: "Rólunk",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Group,
    component: TrainingDashboard,
    layout: "/"
  },
  {
    path: "bejelentkezés",
    name: "Bejelentkezés",
    rtlName: "التطور للاحترافية",
    icon: AccountCircle,
    component: Authenticate,
    layout: "/"
  }
];
