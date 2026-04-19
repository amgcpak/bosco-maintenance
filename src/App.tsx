import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MaintenancePage from "@/pages/MaintenancePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MaintenancePage />
    </QueryClientProvider>
  );
}

export default App;
