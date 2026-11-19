import NexoraLanding from "./NexoraLanding";
import BankingDashboard from "./BankingDashboard";

export default function App() {
  return (
    <NexoraLanding
      dashboard={
        <BankingDashboard
          onLogout={() => window.dispatchEvent(new Event("nexora:logout"))}
        />
      }
    />
  );
}
