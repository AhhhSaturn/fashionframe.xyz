import { write } from "bun";
import { parse } from "lua-json";

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
		await download(module);
	}
	console.timeEnd("Updating Warframe Data");
};
