import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBook() {
    const [s_no, setSNo] = useState();
    const [name, setName] = useState();
    const [author, setAuthor] = useState();
    const [count, setCount] = useState();
    const [cost, setCost] = useState();
    const [proc, setProc] = useState();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let count2 = parseInt(count);
            let cost2 = parseFloat(cost);
            const newBook = { s_no, name, author, count: count2, cost: cost2, proc };
            console.log(newBook)
            let token = localStorage.getItem("auth-token");
            await axios.post("http://localhost:3000/book/add", newBook, { headers: { "x-auth-token": token } });

            navigate("/book/add")
        } catch (err) {
            if (err.response && err.response.data.error) {
                alert(err.response.data.error)
                console.log(err.response.data.error)
                return;
            }
            console.log(err.message)
        }
    }

    return (
        <>
            <div id="outer">
                <h1>Add Book</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>S No.: </td><td><input type="text" name="s_no" id="s_no" onChange={(e) => setSNo(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Name: </td><td><input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Author: </td><td><input type="text" name="author" id="author" onChange={(e) => setAuthor(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Quantity: </td><td><input type="number" defaultValue="1" name="count" id="count" onChange={(e) => setCount(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Cost: </td><td><input type="number" step="0.01" name="cost" id="cost" onChange={(e) => setCost(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Procurement Date: </td><td><input type="date" step="0.01" name="proc" id="proc" onChange={(e) => setProc(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td colSpan="2"><input type="submit" value="Submit" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
}

export default AddBook;