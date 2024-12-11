import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function Maintenance() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    if (userData.data && !userData.data.is_admin) {
        navigate("/")
    }
    let name = "";
    let actions;


    return (
        <>
            <div id="outer" class="container">
                <div class="row">
                    <span class="col-6">Books:</span>
                    <span class="col-3"><Link to="/book/add">Add</Link></span>
                    <span class="col-3"><Link to="/book/update">Update</Link></span>
                </div>
                <div class="row">
                    <span class="col-6">Users:</span>
                    <span class="col-3"><Link to="/">Add</Link></span>
                    <span class="col-3"><Link to="/">Update</Link></span>
                </div>
            </div>
        </>
    );
}

export default Maintenance;