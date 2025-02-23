import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      <main className="xl:mx-[24rem] lg:mx-[15rem] md:mx-[10rem] sm:mx-[5rem] mx-[2rem]">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
