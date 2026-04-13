import { file } from "bun";
import Elysia from "elysia";

const modules = {
	ColourPalettes: await file("modules/ColourPalettes.json").json(),
	ColourPaletteList: await file("modules/ColourPaletteList.json").json(),
};

export const ColourPalettesRouter = new Elysia({
	prefix: "palettes",
}).get("/", modules.ColourPaletteList);
