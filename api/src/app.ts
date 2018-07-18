import * as path from "path";
import * as express from "express";
import * as config from "../../config";
import commonGames from "./methods/commonGames/commonGames";

const app = express();

app.use("/static", express.static("ui/dist/static"));

app.get("/api/commonGames", commonGames);

app.get("*", (req: express.Request, res: express.Response) => {
	const tpl = path.relative(__dirname, "ui/dist/index.html");
	res.status(200);
	res.sendFile(tpl, { root: __dirname });
});

app.listen(config.port);
