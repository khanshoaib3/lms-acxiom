import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function Home() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    const name = userData.data.name
    

    return (
        <>
            <div id="outer" class="container">
                <div class="row">
                    <h3 class="col-12">Hello {name}</h3>
                </div>
            </div>
        </>
    );
}

export default Home;