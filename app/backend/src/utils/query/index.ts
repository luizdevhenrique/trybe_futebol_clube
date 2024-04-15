export const homeQuery = `SELECT
t.id,
t.team_name AS teamName,
h.matches AS matches,
h.favor_goals AS favorGoals,
h.own_goals AS ownGoals,
h.balance AS balance,
h.wins AS wins,
h.draws AS draws,
h.loss AS loss
FROM teams t
LEFT JOIN (
SELECT
  home_team_id,
  COUNT(home_team_id) AS matches,
  SUM(home_team_goals) AS favor_goals,
  SUM(away_team_goals) AS own_goals,
  SUM(home_team_goals - away_team_goals) AS balance,
  SUM(home_team_goals > away_team_goals) AS wins,
  SUM(home_team_goals = away_team_goals) AS draws,
  SUM(home_team_goals < away_team_goals) AS loss
FROM matches
WHERE in_progress = 0
GROUP BY home_team_id
) h ON t.id = h.home_team_id;`;

export const awayQuery = `SELECT
t.id,
t.team_name AS teamName,
a.matches AS matches,
a.favor_goals AS favorGoals,
a.own_goals AS ownGoals,
a.balance AS balance,
a.wins AS wins,
a.draws AS draws,
a.loss AS loss
FROM teams t
LEFT JOIN (
SELECT
  away_team_id,
  COUNT(away_team_id) AS matches,
  SUM(away_team_goals) AS favor_goals,
  SUM(home_team_goals) AS own_goals,
  SUM(away_team_goals - home_team_goals) AS balance,
  SUM(away_team_goals > home_team_goals) AS wins,
  SUM(away_team_goals = home_team_goals) AS draws,
  SUM(away_team_goals < home_team_goals) AS loss
FROM matches
WHERE in_progress = 0
GROUP BY away_team_id
) a ON t.id = a.away_team_id;`;
