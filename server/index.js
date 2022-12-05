import express from 'express';
import { renderToString } from 'react-dom/server';
// import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/frontend/index.html").toString();


const parts = html.split("not rendered");

const app = express(PORT);

app.use("/frontend", express.static("dist/frontend"));
app.use((req,res) => {
    const reactMarkup = (
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>
    )
    res.send(parts[0] + renderToString(reactMarkup) + parts[1]);
    // stream
    // res.write(parts[0]);
    // const reactMarkup = (
    //     <StaticRouter location={req.url}>
    //         <App />
    //     </StaticRouter>
    // )
    // const stream = renderToNodeStream(reactMarkup);
    // stream.pipe(res, {end: false});
    // stream.on("end", () => {
    //     res.write(parts[1]);
    //     res.end();
    // })

})




app.listen(PORT, err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`[%s] Listening on http://localhost:%d`, app.settings.env.toUpperCase(), PORT);
    }
});