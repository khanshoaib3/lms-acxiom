import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function Home() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    let name = "";
    let actions;

    if (userData.data) {
        name = userData.data.name;
        actions;
        if (userData.data.is_admin) {
            actions = <>
                <span class="col-3 m-5"><Link to="/maintenance">Maintenance</Link>  </span>
                <span class="col-3 m-5"><Link to="/reports">Reports</Link>  </span>
                <span class="col-3 m-5"><Link to="/transactions">Transactions</Link>  </span>
            </>
        }
        else {
            actions = <>
                <span class="col-4 m-5"><Link to="/reports">Reports</Link>  </span>
                <span class="col-4 m-5"><Link to="/transactions">Transactions</Link>  </span>
            </>
        }
    }
    return (
        <>
            <div id="outer" class="container">
                <div class="row">
                    <h3 class="col-12">Hello {name}</h3>
                </div>
                <div class="row">
                    {actions}
                </div>
            </div>
        </>
    );
}

export default Home;