import Dashboard from "@material-ui/icons/Dashboard";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Group from "@material-ui/icons/Group";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import LogOut from "views/LogOut/LogOut.jsx";
import TableList from "views/TableList/TableList.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";


export default [
  {
    path: "/vezérlőpult",
    name: "Vezérlőpult",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/tornász"
  },
  {
    path: "/gyakorlatsorok",
    name: "Gyakorlatsorok kezelése",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "content_paste",
    component: UserProfile,
    layout: "/tornász"
  },
  {
    path: "/páciensek",
    name: "Páciensek kezelése",
    rtlName: "قائمة الجدول",
    icon: Group,
    component: TableList,
    layout: "/tornász"
  },
  {
    path: "/kijelentkezés",
    name: "Kijelentkezés",
    rtlName: "قائمة الجدول",
    icon: ExitToApp,
    component: LogOut,
    layout: "/tornász"
  }
];
