import { Header } from "./components/Header";
import { TaskView } from "./components/TaskView";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <Header />
      <TaskView />
    </div>
  );
}

export default App;
