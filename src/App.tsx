import { useQuery } from "react-query";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./pages/Chat";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['auth'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })
 
  return (
    <div className="w-screen flex">
      <Sidebar />
      <div className="flex-1 bg-secondary">
        <Chat />
      </div>
      <Toaster />
    </div>
  );
};

export default App;
