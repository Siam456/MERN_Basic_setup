import { lazy } from "react";
const HomePage = lazy(() => import("../pages/HomePage"));
// const VerifyOtp = lazy(() => import("../pages/VerifyOtp"));
const QrGeneraator = lazy(() => import("../pages/QrGenerator"));

const routes = [
  {
    path: "/homepage",
    component: HomePage,
  },
  {
    path: "/qrcode",
    component: QrGeneraator,
  },
];

export default routes;
