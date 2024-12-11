import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function Transactions() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const [activeTab, setActiveTab] = useState("avail");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    return (
        <>
            <div>
                <h1>Transactions</h1>
                {/* Tab Buttons */}
                <div>
                    <button onClick={() => handleTabClick("avail")}>Is Book Available</button>
                    <button onClick={() => handleTabClick("issue")}>Issue Book</button>
                    <button onClick={() => handleTabClick("return")}>Return Book</button>
                    <button onClick={() => handleTabClick("pay")}>Pay Fine</button>
                    <button onClick={() => handleTabClick("search")}>Search Book</button>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === "avail" && <div>This is content for Tab 1.</div>}
                    {activeTab === "issue" && <div>This is content for Tab 2.</div>}
                    {activeTab === "return" && <div>This is content for Tab 3.</div>}
                    {activeTab === "pay" && <div>This is content for Tab 4.</div>}
                    {activeTab === "search" && <div>This is content for Tab 5.</div>}
                </div>
            </div>
        </>
    );
}

export default Transactions;