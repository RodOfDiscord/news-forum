import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NewsPage } from "./pages/ArticlesPage/ArticlesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import { CookiePopup } from "./components/CookiePopUp/CookiePopUp";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CookiePopup></CookiePopup>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<NewsPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
