import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function Transactions() {
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
    return (
        <>
            <div>
                {/* Tab Buttons */}
                <div>
                    <button onClick={() => handleTabClick("avail")}>Is Book Available</button>
                    <button onClick={() => handleTabClick("issue")}>Issue Book</button>
                    <button onClick={() => handleTabClick("return")}>Return Book</button>
                    <button onClick={() => handleTabClick("pay")}>Pay Fine</button>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === "avail" && <div>This is content for Tab 1.</div>}
                    {activeTab === "issue" && <div>This is content for Tab 2.</div>}
                    {activeTab === "return" && <div>This is content for Tab 3.</div>}
                    {activeTab === "pay" && <div>This is content for Tab 4.</div>}
                </div>
            </div>
        </>
    );
}

export default Transactions;