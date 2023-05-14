import { LecturerProvider } from "./src/context/lecturer";
import MainLayout from "./src/layout/main/MainLayout";

export default function App() {
  return (
    <LecturerProvider>
      <MainLayout />
    </LecturerProvider>
  );
}
