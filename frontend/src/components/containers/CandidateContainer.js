import { CandidateView } from "../views";
import React, { useEffect, useState } from "react";

const CandidateContainer = () => {
    const [candidates, setCandidates] = useState([]);
    const [newCandidate, setNewCandidate] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/candidates").then((response) =>
            response.json().then((data) => {
                setCandidates(data);
            })
        );
    }, [candidates]);

    const handleChange = (e) => {
        setNewCandidate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const request = {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ name: newCandidate }),
        };
        fetch(`http://localhost:5000/candidates`, request)
            .then((response) => response.json())
            .then((data) => console.log("post method", data))
            .catch((error) => console.log(error));
    };

    return (
        <CandidateView
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            candidates={candidates}
        />
    );
};

export default CandidateContainer;
