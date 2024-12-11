import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import BookList from "./book/BookList";

function Reports() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const [activeTab, setActiveTab] = useState("b_list");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    return (
        <>
            <div>
                <h1>Reports</h1>
                {/* Tab Buttons */}
                <div>
                    <button onClick={() => handleTabClick("b_list")}>Books List</button>
                    {/* <button onClick={() => handleTabClick("m_list")}>Movies List</button> */}
                    {/* <button onClick={() => handleTabClick("mber_list")}>Memberships List</button> */}
                    <button onClick={() => handleTabClick("active")}>Active Issues</button>
                    <button onClick={() => handleTabClick("overdue")}>Overdue Returns</button>
                    {/* <button onClick={() => handleTabClick("pending")}>Pending Issue Requests</button> */}
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === "b_list" && <BookList />}
                    {/* {activeTab === "m_list" && <div>This is content for Tab 2.</div>} */}
                    {/* {activeTab === "mber_list" && <div>This is content for Tab 3.</div>} */}
                    {activeTab === "active" && <div>Active Issues</div>}
                    {activeTab === "overdue" && <div>Overdue Returns</div>}
                    {/* {activeTab === "pending" && <div>This is content for Tab 6.</div>} */}
                </div>
            </div>
        </>
    );
}

export default Reports;