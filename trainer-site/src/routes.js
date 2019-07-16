
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Group from "@material-ui/icons/Group";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import TableList from "views/TableList/TableList.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";

const dashboardRoutes = [
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
  }
];

export default dashboardRoutes;
