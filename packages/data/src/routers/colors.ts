import { file } from "bun";
import Elysia from "elysia";
import type { ColourPalette } from "../../types";

const modules = {
	ColourPalettes: (await file(
		"modules/Palettes.json",
	).json()) as ColourPalette[],
	ColourPaletteList: (await file(
		"modules/PaletteList.json",
	).json()) as string[],
};

export const ColourPalettesRouter = new Elysia({
	prefix: "palettes",
})
	.get("/", () => modules.ColourPaletteList)
	.get("/:palette", ({ params: { palette: paletteName }, status }) => {
		const palette = modules.ColourPalettes.filter((item) => {
			return item.name === paletteName;
		})[0];

		if (!palette)
			return status(400, { error: `${paletteName} is not a palette` });

		return palette;
	});
