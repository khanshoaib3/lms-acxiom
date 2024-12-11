import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function Reports() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const [activeTab, setActiveTab] = useState("tab1");

    // Function to handle tab switching
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    let name = "";
    let actions;

    if (userData.data) {
        name = userData.data.name;
    }
    // Master List of Books
    // Master List of Movies
    // Master List of Memberships
    // Active Issues
    // Overdue returns
    // Pending Issue Requests
    

    return (
        <>
            <div>
                <h2>Reports</h2>
                {/* Tab Buttons */}
                <div>
                    <button onClick={() => handleTabClick("b_list")}>Books List</button>
                    {/* <button onClick={() => handleTabClick("m_list")}>Movies List</button> */}
                    {/* <button onClick={() => handleTabClick("mber_list")}>Memberships List</button> */}
                    <button onClick={() => handleTabClick("active")}>Active Issues</button>
                    <button onClick={() => handleTabClick("overdue")}>Overdue Returns</button>
                    <button onClick={() => handleTabClick("pending")}>Pending Issue Requests</button>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === "b_list" && <div>This is content for Tab 1.</div>}
                    {/* {activeTab === "m_list" && <div>This is content for Tab 2.</div>} */}
                    {/* {activeTab === "mber_list" && <div>This is content for Tab 3.</div>} */}
                    {activeTab === "active" && <div>This is content for Tab 4.</div>}
                    {activeTab === "overdue" && <div>This is content for Tab 5.</div>}
                    {activeTab === "pending" && <div>This is content for Tab 6.</div>}
                </div>
            </div>
        </>
    );
}

export default Reports;