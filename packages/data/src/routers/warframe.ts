import { file } from "bun";
import Elysia from "elysia";

const modules = {
	Warframes: (await file("modules/Suits.json").json()) as Warframe[],
	WarframeList: (await file("modules/WarframeList.json").json()) as string[],
};

export const warframeRouter = new Elysia({ prefix: "warframes" })
	.get("/", () => modules.WarframeList)
	.get("/:warframe", ({ params: { warframe }, status }) => {
		const frame = modules.Warframes.filter((i) => i.name === warframe)[0];
		if (!frame) return status(400, `${warframe} is not a warframe`);
		return frame;
	});
