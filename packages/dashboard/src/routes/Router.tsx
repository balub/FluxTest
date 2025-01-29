import { JSXElementConstructor, ReactElement, Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { authRoutes } from "./authRoutes";
import RouteProtection from "./RouteProtection";
import PageLoader from "../components/common/PageLoader/PageLoader";
import BaseLayout from "../layout/BaseLayout/BaseLayout";

export default function Router(): ReactElement<
  any,
  string | JSXElementConstructor<any>
> | null {
  const allRoutes = useRoutes([
    {
      element: (
        // <ErrorBoundary>
        <RouteProtection protectionNeeded={true}>
          <BaseLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </BaseLayout>
        </RouteProtection>
        // </ErrorBoundary>
      ),
      children: [...routes],
    },
    {
      element: (
        // <ErrorBoundary>
        <RouteProtection protectionNeeded={false}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </RouteProtection>
        // </ErrorBoundary>
      ),
      children: [...authRoutes],
    },
  ]);

  return allRoutes;
}
