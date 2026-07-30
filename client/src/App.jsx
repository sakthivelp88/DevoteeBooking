import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { userRoutes } from "@/routes/userRoutes";
import { adminRoutes } from "@/routes/adminRoutes";

const UserLayout = lazy(() => import("@/layouts/UserLayout"));
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));
const AdminRoute = lazy(() => import("@/routes/AdminRoute"));

const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-700">
    Loading...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<UserLayout />}>
            {userRoutes}
          </Route>

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            {adminRoutes}
          </Route>

          <Route
            path="*"
            element={
              <div className="flex h-screen items-center justify-center">
                <h1 className="text-4xl font-bold text-red-600">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
