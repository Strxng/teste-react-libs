import { QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/Home";
import { queryClient } from "./configs/query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}

export default App;
