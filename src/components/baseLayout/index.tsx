import { Outlet } from "react-router-dom"
import Header from "../header"
import Sidebar from "../sidebar"

const BaseLayout = () => {
    return (
        <>
            <div>
                <Header />
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default BaseLayout