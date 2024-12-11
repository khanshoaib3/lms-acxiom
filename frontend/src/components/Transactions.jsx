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
                <div>
                    <button onClick={() => handleTabClick("avail")}>Is Book Available</button>
                    <button onClick={() => handleTabClick("issue")}>Issue Book</button>
                    <button onClick={() => handleTabClick("return")}>Return Book</button>
                    <button onClick={() => handleTabClick("pay")}>Pay Fine</button>
                    <button onClick={() => handleTabClick("search")}>Search Book</button>
                </div>

                <div>
                    {activeTab === "avail" && <h2>Check Book Availability</h2>}
                    {activeTab === "issue" && <h2>Issue Book</h2>}
                    {activeTab === "return" && <h2>Return Book</h2>}
                    {activeTab === "pay" && <h2>Pay Fine</h2>}
                    {activeTab === "search" && <h2>Search for a Book</h2>}
                </div>
            </div>
        </>
    );
}

export default Transactions;