import { file } from "bun";
import Elysia from "elysia";

const modules = {
	Warframes: await file("modules/Warframes.json").json(),
	WarframeList: await file("modules/WarframeList.json").json(),
};

export const warframeRouter = new Elysia({ prefix: "warframe" })
	.get("/warframes", modules.WarframeList)
	.get("/:warframe", ({ params: { warframe }, status }) => {
		if (!modules.Warframes[warframe])
			return status(400, `"${warframe} is not a warframe"`);
		return modules.Warframes[warframe];
	});
