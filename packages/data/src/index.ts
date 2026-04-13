import { parseArgs } from "node:util";
import openapi from "@elysiajs/openapi";
import Elysia, { t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import packageJson from "../package.json";
import { downloadModules } from "./modules";
import { openapiConfig } from "./openapi";

console.time("@fashionframe.xyz/data");

const { values } = parseArgs({
	args: Bun.argv,
	options: {
		skipDownload: {
			type: "boolean",
			short: "s",
			default: false,
		},
	},
	allowPositionals: true,
});
if (values.skipDownload) {
	console.log("Skipping Download");
} else {
	await downloadModules(["Warframes", "Cosmetics", "ColourPalettes"]);
}

const { warframeRouter } = await import("./routers/warframe");
const { cosmeticsRouter } = await import("./routers/cosmetic");
const { ColourPalettesRouter } = await import("./routers/colors");

new Elysia()
	.use(openapi(openapiConfig))
	.guard({
		headers: t.Object({
			token: t.Optional(t.String()),
		}),
	})
	.use(
		rateLimit({
			skip: ({ headers }) => {
				if (headers.get("token") === Bun.env.RATE_LIMIT_BYPASS_KEY) {
					return true;
				}
				return false;
			},
		}),
	)
	.state("version", packageJson.version)
	.state("started", Date.now())
	.get("lastUpdate", ({ store: { started } }) => started)
	.get("version", ({ store: { version } }) => version)
	.use(warframeRouter)
	.use(cosmeticsRouter)
	.use(ColourPalettesRouter)
	.listen(3000, async ({ development, hostname, port }) => {
		console.timeEnd("@fashionframe.xyz/data");

		// for some reason bun doesn't like backticks unless i wrap it in a function
		const ansi = Bun.markdown.ansi(
			((
				hostname: string,
				port: string,
				dev: boolean,
				startTime: number,
			) => `# @fashionframe.xyz/data | Warframe Cosmetic API
| | |
|-|-|
| ***Url*** | http://${hostname}:${port}/ |
| ***OpenAPI*** | http://${hostname}:${port}/openapi |
| ***Version*** | ${packageJson.version} |
| ***Env*** | ${dev ? "Development" : "Production"} |
| ***Start Time*** | ${Math.floor(startTime / 1000000)}ms |
`)(
				hostname || "socket",
				port ? port.toString() : "socket",
				development,
				Bun.nanoseconds(),
			),
		);

		console.log(ansi);
	});
