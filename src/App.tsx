import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./views/HomePage";
import { CountryDashboard } from "./views/CountryDashboard";
import { MatrixView } from "./views/MatrixView";
import { SubsectorDeepDive } from "./views/SubsectorDeepDive";
import { PirComparator } from "./views/PirComparator";
import { AboutPage } from "./views/AboutPage";
import { WsipMatrixTab } from "./views/WsipMatrixTab";
import { CountriesPage } from "./views/CountriesPage";
import { ProjectWizard } from "./views/ProjectWizard";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/wsip-matrix"
        element={
          <Layout>
            <WsipMatrixTab />
          </Layout>
        }
      />
      <Route
        path="/pir-comparator"
        element={
          <Layout>
            <PirComparator />
          </Layout>
        }
      />
      <Route
        path="/countries"
        element={
          <Layout>
            <CountriesPage />
          </Layout>
        }
      />
      <Route
        path="/wizard"
        element={
          <Layout>
            <ProjectWizard />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />

      {/* Country-scoped routes */}
      <Route
        path="/country/:code"
        element={
          <Layout>
            <CountryDashboard />
          </Layout>
        }
      />
      <Route
        path="/country/:code/matrix"
        element={
          <Layout>
            <MatrixView />
          </Layout>
        }
      />
      <Route
        path="/country/:code/subsector/:subKey"
        element={
          <Layout>
            <SubsectorDeepDive />
          </Layout>
        }
      />
    </Routes>
  );
}
