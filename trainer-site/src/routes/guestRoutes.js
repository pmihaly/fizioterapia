import NavigateNext from '@material-ui/icons/NavigateNext';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Group from '@material-ui/icons/Group';
import Home from '@material-ui/icons/Home';
import DashboardPage from 'views/Dashboard/Dashboard.jsx';
import Authenticate from 'views/Authenticate/Authenticate.jsx';
import Icons from 'views/Icons/Icons.jsx';

let routes = [
  {
    path: 'főoldal',
    name: 'Főoldal',
    rtlName: 'لوحة القيادة',
    icon: Home,
    component: DashboardPage,
    layout: '/',
  },
  {
    path: 'rólunk',
    name: 'Rólunk',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Group,
    component: Icons,
    layout: '/',
  },
];

if (localStorage.getItem('user') === null) {
  routes.push({
    path: 'bejelentkezés',
    name: 'Bejelentkezés',
    rtlName: 'التطور للاحترافية',
    icon: AccountCircle,
    component: Authenticate,
    layout: '/',
  });
} else {
  routes.push({
    path: 'bejelentkezés',
    name: 'Tornász oldalhoz',
    rtlName: 'التطور للاحترافية',
    icon: NavigateNext,
    component: Authenticate,
    layout: '/',
  });
}
export default routes;
