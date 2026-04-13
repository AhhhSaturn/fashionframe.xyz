import { file } from "bun";
import Elysia, { t } from "elysia";

const modules = {
	ColourPalettes: (await file(
		"modules/ColourPalettes.json",
	).json()) as ColourPalettes[],
	ColourPaletteList: await file("modules/ColourPaletteList.json").json(),
};

export const ColourPalettesRouter = new Elysia({
	prefix: "palettes",
})
	.get("/", () => modules.ColourPaletteList, {
		response: t.Array(t.String()),
	})
	.get(
		"/:palette",
		({ params: { palette: paletteName }, status }) => {
			const palette = modules.ColourPalettes.filter((item) => {
				return item.name === paletteName;
			})[0];

			if (!palette) return status(400, `"${paletteName} is not a palette"`);

			return palette;
		},
		{
			response: {
				400: t.String({ default: "{palette} is not a palette" }),
				200: t.Object({
					uniqueName: t.String(),
					name: t.String(),
					description: t.String(),
					hexColours: t.Array(
						t.Object({
							value: t.String(),
						}),
					),
				}),
			},
		},
	);
