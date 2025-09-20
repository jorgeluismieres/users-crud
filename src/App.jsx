import UsersPage from "./pages/UsersPage";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

function App() {
  return (
    <ErrorBoundary>
      <UsersPage />
    </ErrorBoundary>
  );
}

export default App;
