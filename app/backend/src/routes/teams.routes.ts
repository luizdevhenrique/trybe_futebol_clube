import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/Teams.controllers';

const teamsController = new TeamsController();

const teamsRoutes = Router();

teamsRoutes.get('/', (req: Request, res: Response) => teamsController.getTeams(req, res));
teamsRoutes.get('/:id', (req: Request, res: Response) => teamsController.getTeamById(req, res));

export default teamsRoutes;
