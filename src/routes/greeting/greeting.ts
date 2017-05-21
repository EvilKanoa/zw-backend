import {Router, Request, Response, NextFunction} from 'express';

export class Greeting {

    public router: Router;

    constructor() {
        this.router = Router();
    }

    public init = () => {
        this.router.get('/', this.getGreeting);
        this.router.post('/', this.postGreeting);
    }

    private getGreeting = (req: Request, res: Response, next: NextFunction) => {
        res.send("Hello there friend!");
    }

    private postGreeting = (req: Request, res: Response, next: NextFunction) => {
        const name = req.param("name") || JSON.parse(req.body).name;
        if (name) {
            res.status(200).send(`Hello there ${name}!`);
        } else {
            res.status(500).send("No name given!");
        }
    }

}

const greeting = new Greeting();
greeting.init();
export default greeting;
