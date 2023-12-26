import { Refine } from "@refinedev/core";
import routerBindings, { NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { HeadlessInferencer } from "@refinedev/inferencer/headless";

import { Layout } from "./components/layout";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerBindings}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "posts",
            list: "/posts",
            show: "/posts/show/:id",
            create: "/posts/create",
            edit: "/posts/edit/:id",
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route index element={<NavigateToResource resource="posts" />} />
            <Route path="posts">
              <Route index element={<HeadlessInferencer />} />
              <Route path="show/:id" element={<HeadlessInferencer />} />
              <Route path="edit/:id" element={<HeadlessInferencer />} />
              <Route path="create" element={<HeadlessInferencer />} />
            </Route>
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
      </Refine>
    </BrowserRouter>
  );
};
export default App;