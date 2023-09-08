package lk.ccs.ipldashboard.controller;

import lk.ccs.ipldashboard.model.Match;
import lk.ccs.ipldashboard.model.Team;
import lk.ccs.ipldashboard.repository.IMatchRepository;
import lk.ccs.ipldashboard.repository.ITeamRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
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
}
