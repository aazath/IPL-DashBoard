import React, {useEffect, useState} from "react";
import {MatchDetailCard} from "../components/MatchDetailCard";
import {useParams} from "react-router-dom";


export const MatchPage = () =>{
    const [matches, setMatches] = useState([]);
    const {teamName,year}  = useParams();

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8181/teams/${teamName}/matches?year=${year}`);
                const data = await response.json();
                setMatches(data);
            };

            fetchMatches();
        },[]
    );
    if (!matches){
        return <h1>Match not found</h1>
    }
    return (
        <div className="MatchPage">
            <h1>Match Page</h1>
            {
                matches.map(match => <MatchDetailCard teamName={teamName} match={match} />)
            }
        </div>
    );
}