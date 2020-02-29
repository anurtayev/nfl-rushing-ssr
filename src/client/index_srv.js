import dotenv from "dotenv";
import renderer from "./renderer";
import express from "express";
import { getState } from "./util";
import { Readable } from "stream";
import { fieldNames } from "./model";

dotenv.config();

const appPort = process.env.APP_PORT || 8000;

const app = express();
app.use(express.static("public"));
app
  .get("/", (req, res) => {
    res.end(renderer(getState(req.url)));
  })
  .get("/download", (req, res) => {
    const { data } = getState(req.url);
    let dataString = '"' + Object.values(fieldNames).join('","') + '"\n';
    dataString = data.reduce((acc, cur) => {
      // eslint-disable-next-line
      const { __sort_Lng, ...pureCur } = cur;
      return acc.concat('"', Object.values(pureCur).join('","'), '"\n');
    }, dataString);
    const readable = Readable.from(dataString);

    try {
      let aborted = false;

      req.on("aborted", function() {
        aborted = true;
        readable.emit("error", new Error("Download aborted."));
      });

      if (aborted) {
        readable.emit("aborted");
      }

      res.status(200);

      res.set({
        "Cache-Control": "no-cache",
        "Content-Type": "text/csv",
        "Content-Length": dataString.length,
        "Content-Disposition": "attachment; filename=rushing_data.csv"
      });

      readable.pipe(res);
    } catch (err) {
      //
    }
  });

app.use(function(err, req, res) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(appPort, () => {
  console.info("listening on port ", appPort);
});
