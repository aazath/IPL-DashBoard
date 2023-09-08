package lk.ccs.ipldashboard.repository;

import lk.ccs.ipldashboard.model.Team;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITeamRepository extends CrudRepository <Team, Long>{
    Team findByTeamName(String teamName);
}
