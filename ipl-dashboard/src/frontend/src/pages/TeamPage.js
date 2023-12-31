import React, {useEffect, useState} from "react";
import {MatchDetailCard} from "../components/MatchDetailCard";
import {MatchSmallCard} from "../components/MatchSmallCard";
import {useParams} from "react-router-dom";
import { PieChart } from 'react-minimal-pie-chart';
import './TeamPage.scss';

export const TeamPage = () =>{

    const [team, setTeam]  = useState({matches:[]});
    const {teamName}  = useParams();

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8181/teams/${teamName}`);
                const data = await response.json();
                setTeam(data);
            };

            fetchMatches();
        },[teamName]
    );
    if (!team || !team.teamName){
        return <h1>Team not found</h1>
    }
    return (
        <div className="TeamPage">
           <div className="team-name-section">
               <h1  className="team-name">{team.teamName}</h1>
           </div>
            <div className="win-loss-section">
                Win / Losses
                <PieChart
                    data={[
                        { title: 'Wins', value: team.totalWins, color: '#14ada8' },
                        { title: 'Losses', value: team.totalMatches-team.totalWins, color: '#ec5f54' }
                    ]}
                />
            </div>
            <div className="match-detail-section">
            <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
            </div>
            {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} teamName={team.teamName} match={match} />)}
        <div className="more-link">
            <a href="#">More ></a>
        </div>
        </div>
    );
}
