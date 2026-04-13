import { file } from "bun";
import Elysia, { t } from "elysia";

const modules = {
	AnimationSet: await file("modules/AnimationSet.json").json(),
	Ephemera: await file("modules/Ephemera.json").json(),
	Signa: await file("modules/Signa.json").json(),
	Syandanas: await file("modules/Syandanas.json").json(),
	Armor: {
		Arm: await file("modules/ArmArmor.json").json(),
		Chest: await file("modules/ChestArmor.json").json(),
		Leg: await file("modules/LegArmor.json").json(),
		Shoulder: await file("modules/ShoulderArmor.json").json(),
		Misc: await file("modules/MiscArmor.json").json(),
	},
};

export const cosmeticsRouter = new Elysia({ prefix: "cosmetics" })
	.get("/animationset", () => modules.AnimationSet, {
		response: t.Array(t.String()),
	})
	.get("/ephemera", () => modules.Ephemera, {
		response: t.Array(t.String()),
	})
	.get("/signa", () => modules.Signa, {
		response: t.Array(t.String()),
	})
	.get("/syandanas", () => modules.Syandanas, {
		response: t.Array(t.String()),
	})
	.group("/armor", (app) =>
		app
			.get("/arm", () => modules.Armor.Arm, {
				response: t.Array(t.String()),
			})
			.get("/chest", () => modules.Armor.Chest, {
				response: t.Array(t.String()),
			})
			.get("/leg", () => modules.Armor.Leg, {
				response: t.Array(t.String()),
			})
			.get("/shoulder", () => modules.Armor.Shoulder, {
				response: t.Array(t.String()),
			})
			.get("/misc", () => modules.Armor.Misc, {
				response: t.Array(t.String()),
			}),
	);
