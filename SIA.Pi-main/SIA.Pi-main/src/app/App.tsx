import { RouterProvider } from "react-router";
import { router } from "./routes";
import { PWAUpdatePrompt } from "./components/PWAUpdatePrompt";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <PWAUpdatePrompt />
    </>
  );
}
