package lk.ccs.ipldashboard.controller;

import lk.ccs.ipldashboard.model.Match;
import lk.ccs.ipldashboard.model.Team;
import lk.ccs.ipldashboard.repository.IMatchRepository;
import lk.ccs.ipldashboard.repository.ITeamRepository;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
public class TeamController {

    private ITeamRepository teamRepository;
    private IMatchRepository matchRepository;

    public TeamController(ITeamRepository teamRepository,IMatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }


    @GetMapping("/teams/{teamName}")
    public Team findByTeamName(@PathVariable String teamName){
        Team team = this.teamRepository.findByTeamName(teamName);
        team.setMatches(matchRepository.findLatestMatchesByTeam(teamName,4));
        return team;
    }

    @GetMapping("/teams/{teamName}/matches")
        public List<Match> findTeamAllMatchesByYear(@PathVariable String teamName, @RequestParam int year){
            Date startDate = Date.valueOf(LocalDate.of(year,1,1));
            Date endDate = Date.valueOf(LocalDate.of(year+1,1,1));
            return this.matchRepository.getMatchesByTeamBetweenDates(
                    teamName,startDate,endDate);
        }
}
