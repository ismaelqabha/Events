import ClientNotification from "../src/screens/ClientNotification";
import ClientPayment from "../src/screens/ClientPayment";
import LogOut from "../src/screens/LogOut";
import Security from "../src/screens/Security";
import Settings from "../src/screens/Settings";
import Support from "../src/screens/Support";
import UserProfile from "../src/screens/UserProfile";
import ProviderTapNav from "./ProviderTapNav";
import { ScreenNames } from "./ScreenNames";
import TabNavigator from "./tabNavigator";
import { Icons } from "../src/components/Icons"


export const SharedScreen = [
    {
        route: 'ClientHome',
        label: 'الرئيسية',
        type: Icons.AntDesign,
        icon: 'home',
        component: TabNavigator,
    },
    {
        route: ScreenNames.UserProfile,
        label: 'المعلومات الشخصية',
        type: Icons.AntDesign,
        icon: 'profile',
        component: UserProfile,
    },
    {
        route: ScreenNames.Security,
        label: 'الخصوصية والامان',
        type: Icons.MaterialCommunityIcons,
        icon: 'security',
        component: Security,
    },
    {
        route: ScreenNames.Settings,
        label: 'الاعدادات',
        type: Icons.AntDesign,
        icon: 'setting',
        component: Settings,
    },
    {
        route: ScreenNames.Support,
        label: 'الدعم الفني',
        type: Icons.FontAwesome,
        icon: 'support',
        component: Support,
    },
    {
        route: 'ProviderHome',
        label: 'خدماتي كمزود',
        type: Icons.Fontisto,
        icon: 'indent',
        component: ProviderTapNav,
    },
    {
        route: ScreenNames.LogOut,
        label: 'تسجيل الخروج',
        type: Icons.Entypo,
        icon: 'log-out',
        component: LogOut,
    },
]

export const ClientScreen = [
    {
        route: ScreenNames.ClientPayment,
        label: 'الدفعات',
        type: Icons.MaterialIcons,
        icon: 'payment',
        component: ClientPayment,
    },
    {
        route: ScreenNames.ClientNotification,
        label: 'الاشعارات',
        type: Icons.AntDesign,
        icon: 'notification',
        component: ClientNotification,
    },  
]

export const ProviderScreen =[

]