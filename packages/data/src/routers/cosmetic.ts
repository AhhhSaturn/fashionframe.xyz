import { file } from "bun";
import Elysia from "elysia";

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
	.get("/animationset", modules.AnimationSet)
	.get("/ephemera", modules.Ephemera)
	.get("/signa", modules.Signa)
	.get("/syandanas", modules.Syandanas)
	.group("/armor", (app) =>
		app
			.get("/arm", modules.Armor.Arm)
			.get("/chest", modules.Armor.Chest)
			.get("/leg", modules.Armor.Leg)
			.get("/shoulder", modules.Armor.Shoulder)
			.get("/misc", modules.Armor.Misc),
	);
