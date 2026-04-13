import { write } from "bun";
import { parse } from "lua-json";
import { decompress } from "lzma-js-simple-v2";

const split = (module: string, data: any) => {
	const files = new Map<string, any>();
	switch (module) {
		case "Warframes": {
			const rawWarframes = data.Warframes;

			const warframeList: string[] = [];
			const warframes: { [key: string]: Warframe } = {};

			for (const [key, value] of Object.entries(rawWarframes)) {
				warframeList.push(key);

				warframes[key] = {
					name: value.Name,
					description: value.Description,
					image: value.Image,
				};
			}

			files.set("WarframeList", warframeList);
			files.set("Warframes", warframes);
			break;
		}
		case "Cosmetics": {
			const rawCosmetics = data.Users;

			files.set("Syandanas", rawCosmetics.Syandana.Equipments.Syandana);
			files.set(
				"AnimationSet",
				rawCosmetics["Animation Set"].Equipments["Animation Set"],
			);
			files.set("Signa", rawCosmetics.Signa.Equipments.Signa);
			files.set("Ephemera", rawCosmetics.Ephemera.Equipments.Ephemera);

			const chestArmor: string[] = [];
			const legArmor: string[] = [];
			const shoulderArmor: string[] = [];
			const armArmor: string[] = [];

			const miscArmor: string[] = [];

			// ugly if
			for (const armor of rawCosmetics.Armor.Equipments.Armor) {
				if (armor.includes("Chest")) {
					chestArmor.push(armor);
				} else if (armor.includes("Arm")) {
					armArmor.push(armor);
				} else if (armor.includes("Shoulder")) {
					shoulderArmor.push(armor);
				} else if (armor.includes("Leg")) {
					legArmor.push(armor);
				} else if (armor.includes("Knee")) {
					legArmor.push(armor);
				} else if (armor.includes("Ankle")) {
					legArmor.push(armor);
				} else if (armor.includes("Spurs")) {
					legArmor.push(armor);
				} else if (armor.includes("Shin")) {
					legArmor.push(armor);
				} else if (armor.includes("Greaves")) {
					legArmor.push(armor);
				} else if (armor.includes("Ribbon")) {
					chestArmor.push(armor);
				} else if (armor.includes("Spaulders")) {
					shoulderArmor.push(armor);
				} else {
					miscArmor.push(armor);
				}
			}

			files.set("ChestArmor", chestArmor);
			files.set("LegArmor", legArmor);
			files.set("ShoulderArmor", shoulderArmor);
			files.set("ArmArmor", armArmor);
			files.set("MiscArmor", miscArmor);

			break;
		}
		default: {
			files.set(module, data);
		}
	}
	return files;
};

const getUrl = (module: string) =>
	`https://wiki.warframe.com/w/Module:${module}/data?action=raw`;
const contentUrl = (content: string) =>
	`http://content.warframe.com/PublicExport/Manifest/${content}`;

const ColourPalettes = async () => {
	console.time("ColourPalettes");
	const compressedIndex = await fetch(
		"https://origin.warframe.com/PublicExport/index_en.txt.lzma",
	).then((res) => res.bytes());
	console.timeLog("ColourPalettes", "Downloaded Index");

	const index = (decompress(compressedIndex) as string).split("\r\n");
	console.timeLog("ColourPalettes", "Decompressed Index");

	const ColourPalettesHash = index.filter((i) => {
		return i.includes("ExportFlavour");
	})[0];
	if (!ColourPalettesHash)
		return console.warn("Failed to get colour picker hash");

	const data = (await fetch(contentUrl(ColourPalettesHash)).then((res) =>
		res.json(),
	)) as { ExportFlavour: ColourPalettes[] };
	console.timeLog("ColourPalettes", "Downloaded");

	const palettes: ColourPalettes[] = [];
	const paletteList: string[] = [];

	for (const item of data.ExportFlavour) {
		if (item.excludeFromCodex) continue;
		if (!item.uniqueName.includes("ColourPicker")) continue;
		palettes.push(item);
		paletteList.push(item.name);
	}
	console.timeLog("ColourPalettes", "Split data file");

	write(`modules/ColourPalettes.json`, JSON.stringify(palettes));
	console.timeLog("ColourPalettes", "Wrote ColourPalettes.json");
	write(`modules/ColourPaletteList.json`, JSON.stringify(paletteList));
	console.timeLog("ColourPalettes", "Wrote ColourPaletteList.json");
	console.timeEnd("ColourPalettes");
};

const download = async (module: string) => {
	console.time(module);
	const data = await fetch(getUrl(module)).then((res) => res.text());
	console.timeLog(module, "Downloaded");

	const parsedData = parse(data);
	console.timeLog(module, "Parsed");

	const splitFiles = split(module, parsedData);
	console.timeLog(module, `Split data file`);

	for (const file of splitFiles) {
		write(`modules/${file[0]}.json`, JSON.stringify(file[1]), {
			createPath: true,
		});
		console.timeLog(module, `Wrote ${file[0]}.json`);
	}
	console.timeEnd(module);
};

export const downloadModules = async (modules: string[]) => {
	console.time("Updating Warframe Data");
	for (const module of modules) {
		if (module === "ColourPalettes") {
			await ColourPalettes();
		} else {
			await download(module);
		}
	}
	console.timeEnd("Updating Warframe Data");
};
