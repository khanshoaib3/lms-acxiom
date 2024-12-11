import axios from "axios";
import { useEffect, useState } from "react";

function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:3000/book/all");
                setBooks(response.data.books);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []); 

    return (
        <>
            <div id="outer">
                <h2>Books List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>S. No.</th><th>Book Name</th><th>Author Name</th><th>Quantity</th><th>Cost</th><th>Procurement Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr>
                                <td>{book.s_no}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.count}</td>
                                <td>{book.cost}</td>
                                <td>{book.proc_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default BookList;