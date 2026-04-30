import { file } from "bun";
import Elysia from "elysia";
import type { GenericEntry } from "../../types";

const modules = {
	AnimationSet: (await file(
		"modules/AnimationSet.json",
	).json()) as GenericEntry[],
	Ephemera: (await file("modules/Ephemera.json").json()) as GenericEntry[],
	Signa: (await file("modules/Signa.json").json()) as GenericEntry[],
	Syandanas: (await file("modules/Syandana.json").json()) as GenericEntry[],
	Armor: {
		Shoulder: (await file(
			"modules/ShoulderArmor.json",
		).json()) as GenericEntry[],
		Chest: (await file("modules/ChestArmor.json").json()) as GenericEntry[],
		Leg: (await file("modules/LegArmor.json").json()) as GenericEntry[],
		Helmet: (await file("modules/HelmetArmor.json").json()) as {
			[key: string]: GenericEntry[];
		},
	},
	Skins: (await file("modules/Skins.json").json()) as {
		[key: string]: GenericEntry[];
	},
	Auxiliary: (await file("modules/Auxiliary.json").json()) as GenericEntry[],
};

export const cosmeticsRouter = new Elysia({ prefix: "cosmetics" })
	.get("/animationset", () => modules.AnimationSet)
	.get("/ephemera", () => modules.Ephemera)
	.get("/signa", () => modules.Signa)
	.get("/syandana", () => modules.Syandanas)
	.get("/auxiliary", () => modules.Auxiliary)
	.get("/skin/:warframe", ({ params: { warframe }, status }) => {
		if (!modules.Skins[warframe])
			return status(400, `${warframe} is not a warframe`);
		return modules.Skins[warframe];
	})
	.group("/armor", (app) =>
		app
			.get("/shoulder", () => modules.Armor.Shoulder)
			.get("/chest", () => modules.Armor.Chest)
			.get("/leg", () => modules.Armor.Leg)
			.get("/helmet/:warframe", ({ params: { warframe }, status }) => {
				if (!modules.Armor.Helmet[warframe])
					return status(400, `${warframe} is not a warframe`);
				return modules.Armor.Helmet[warframe];
			}),
	);
