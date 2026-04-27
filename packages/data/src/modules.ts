import { file, write } from "bun";
import { decompress } from "lzma-js-simple-v2";
import type {
	ColourPalette,
	Flavour,
	GenericEntry,
	Module,
	Warframe,
} from "../types";

// so we can wait for the Suits.json to exist
class codeNameToFrameName {
	private warframes = file("modules/Suits.json").json() as Promise<Warframe[]>;
	private warframeList = file("modules/WarframeList.json").json() as Promise<
		string[]
	>;
	convert = async (codeName: string) => {
		if ((await this.warframeList).includes(codeName)) return codeName;
		if (codeName === "Anima") return "Equinox";
		if (codeName === "Archer") return "Ivara";
		if (codeName === "Asp") return "Saryn";
		if (codeName === "Decree") return "Banshee";
		if (codeName === "Horse") return "Dagath";
		if (codeName === "Hydroid") return "Hydroid";
		if (codeName === "Umbra") return "ExcaliburUmbra";
		const frame = (await this.warframes).filter(
			(frame) => frame.uniqueName.split("/")[3] === codeName,
		)[0];

		if (!frame?.name) return false;
		return frame.name;
	};
}
const { convert } = new codeNameToFrameName();

const split = async (module: Module | "Warframes", data: any) => {
	const files = new Map<string, any>();
	switch (module) {
		case "Warframes": {
			const warframes: Warframe[] = data.ExportWarframes;

			const suits: Warframe[] = [];
			const warframeList: string[] = [];
			const mechSuits: Warframe[] = [];
			const spaceSuits: Warframe[] = [];

			for (const warframe of warframes) {
				switch (warframe.productCategory) {
					case "Suits": {
						suits.push(warframe);
						warframeList.push(warframe.name);
						break;
					}
					case "MechSuits": {
						mechSuits.push(warframe);
						break;
					}
					case "SpaceSuits": {
						spaceSuits.push(warframe);
						break;
					}
				}
			}

			files.set("Suits", suits);
			files.set("MechSuits", mechSuits);
			files.set("SpaceSuits", spaceSuits);
			files.set("WarframeList", warframeList);
			break;
		}
		case "Flavour": {
			const flavour: Flavour[] = data.ExportFlavour;

			const palettes: ColourPalette[] = [];
			const paletteList: string[] = [];
			const glyph: GenericEntry[] = [];
			const animationSet: GenericEntry[] = [];

			for (const item of flavour) {
				if (item.excludeFromCodex) continue;
				if (item.uniqueName.includes("ColourPicker")) {
					palettes.push(item as ColourPalette);
					paletteList.push(item.name);
				} else if (item.uniqueName.includes("AvatarImages")) {
					glyph.push(item);
				} else if (item.name.includes("Animation Set")) {
					animationSet.push(item);
				}
			}

			files.set("Palettes", palettes);
			files.set("PaletteList", paletteList);
			files.set("Glyph", glyph);
			files.set("AnimationSet", animationSet);
			break;
		}
		case "Customs": {
			const customs: GenericEntry[] = data.ExportCustoms;

			const syandana: GenericEntry[] = [];
			const chestArmor: GenericEntry[] = [];
			const legArmor: GenericEntry[] = [];
			const shoulderArmor: GenericEntry[] = [];
			const armArmor: GenericEntry[] = [];
			const helmetArmor: { [key: string]: GenericEntry[] } = {};
			const ephemera: GenericEntry[] = [];
			const signa: GenericEntry[] = [];
			const skins: { [key: string]: GenericEntry[] } = {};

			const misc: GenericEntry[] = [];

			for (const item of customs) {
				// ugly if
				if (item.name.includes("Chest")) {
					chestArmor.push(item);
				} else if (item.name.includes("Arm")) {
					armArmor.push(item);
				} else if (item.name.includes("Shoulder")) {
					shoulderArmor.push(item);
				} else if (item.name.includes("Leg")) {
					legArmor.push(item);
				} else if (item.name.includes("Knee")) {
					legArmor.push(item);
				} else if (item.name.includes("Ankle")) {
					legArmor.push(item);
				} else if (item.name.includes("Spurs")) {
					legArmor.push(item);
				} else if (item.name.includes("Shin")) {
					legArmor.push(item);
				} else if (item.name.includes("Greaves")) {
					legArmor.push(item);
				} else if (item.name.includes("Ribbon")) {
					chestArmor.push(item);
				} else if (item.name.includes("Spaulders")) {
					shoulderArmor.push(item);
				} else if (item.uniqueName.includes("Ephemera")) {
					ephemera.push(item);
				} else if (item.uniqueName.includes("Signa")) {
					signa.push(item);
				} else if (item.name.includes("Syandana")) {
					syandana.push(item);
				} else if (item.uniqueName.includes("Helmet")) {
					const helmetForCodeName = item.uniqueName.split("/")[4];
					if (!helmetForCodeName) continue;
					const helmetFor = await convert(helmetForCodeName);
					if (!helmetFor) continue;

					if (!helmetArmor[helmetFor]) helmetArmor[helmetFor] = [];

					helmetArmor[helmetFor].push(item);
				} else if (
					item.uniqueName.includes("/Lotus/Upgrades/Skins/") &&
					item.name.includes("Skin")
				) {
					const skinForCodeName = item.uniqueName.split("/")[4];
					if (!skinForCodeName) continue;
					const skinFor = await convert(skinForCodeName);
					if (!skinFor) continue;

					if (!skins[skinFor]) skins[skinFor] = [];

					skins[skinFor].push(item);
				} else {
					misc.push(item);
				}
			}

			files.set("Syandana", syandana);
			files.set("ChestArmor", chestArmor);
			files.set("LegArmor", legArmor);
			files.set("ShoulderArmor", shoulderArmor);
			files.set("ArmArmor", armArmor);
			files.set("Ephemera", ephemera);
			files.set("Signa", signa);
			files.set("Syandana", syandana);
			files.set("HelmetArmor", helmetArmor);
			files.set("Skins", skins);
			files.set("Misc", misc);
			break;
		}
		default: {
			files.set(module, data);
		}
	}

	return files;
};

const getUrl = (content: string) =>
	`http://content.warframe.com/PublicExport/Manifest/${content}`;

const download = async (module: Module, hash: string) => {
	console.time(module);
	const data = await fetch(getUrl(hash)).then((res) => res.json());
	console.timeLog(module, "Downloaded");

	const splitFiles = await split(module, data);
	console.timeLog(module, `Split data file`);

	for (const file of splitFiles) {
		write(`modules/${file[0]}.json`, JSON.stringify(file[1]), {
			createPath: true,
		});
		console.timeLog(module, `Wrote ${file[0]}.json`);
	}
	console.timeEnd(module);
};

export const downloadModules = async (
	modules: ["Warframes", ...Module[]] | Module[],
) => {
	console.time("Updating Warframe Data");

	console.time("Index");
	const compressedHashes = await fetch(
		"https://origin.warframe.com/PublicExport/index_en.txt.lzma",
	).then((res) => res.bytes());
	console.timeLog("Index", "Downloaded Index");

	const hashes = (decompress(compressedHashes) as string).split("\r\n");
	console.timeLog("Index", "Decompressed Index");

	for (const module of modules) {
		const hash = hashes.filter((i) => {
			return i.includes(module);
		})[0];

		if (!hash) {
			console.error(`Could not find hash for ${module}`);
			continue;
		}

		await download(module, hash);
	}
	console.timeEnd("Updating Warframe Data");
};
