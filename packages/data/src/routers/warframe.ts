import { file } from "bun";
import Elysia, { t } from "elysia";

const modules = {
	Warframes: await file("modules/Warframes.json").json(),
	WarframeList: await file("modules/WarframeList.json").json(),
};

export const warframeRouter = new Elysia({ prefix: "warframes" })
	.get("/", () => modules.WarframeList, {
		response: t.Array(t.String()),
	})
	.get(
		"/:warframe",
		({ params: { warframe }, status }) => {
			if (!modules.Warframes[warframe])
				return status(400, `"${warframe} is not a warframe"`);
			return modules.Warframes[warframe];
		},
		{
			response: {
				400: t.String({ default: "{warframe} is not a warframe" }),
				200: t.Object({
					name: t.String(),
					image: t.String(),
					description: t.String(),
				}),
			},
		},
	);
