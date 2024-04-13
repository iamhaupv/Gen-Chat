import { lazy } from "react";

const HomePage = lazy(() => import('./Home'));
const MainPage = lazy(() => import('./Main'));

export default [
    {
        name: "Home", 
        path: '/', 
        exact: true, 
        public: true, 
        component: HomePage
    }, 
    {
        name: "Main", 
        path: '/main', 
        exact: true, 
        public: true, 
        component: MainPage
    }, 
]