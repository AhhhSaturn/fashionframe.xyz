import { describe, expect, test } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { api as API } from "../src";

const api = treaty(API, {
	headers: {
		token: "bypass",
	},
});

describe("Cosmetic Router", () => {
	test("Animation Set", async () => {
		const { data, error } = await api.cosmetics.animationset.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
	});
	test("Ephemera", async () => {
		const { data, error } = await api.cosmetics.ephemera.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
	});
	test("Signa", async () => {
		const { data, error } = await api.cosmetics.signa.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
	});
	test("Syandana", async () => {
		const { data, error } = await api.cosmetics.syandanas.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
	});
	test("Arm Armor", async () => {
		const { data, error } = await api.cosmetics.armor.arm.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
	});
	test("Chest Armor", async () => {
		const { data, error } = await api.cosmetics.armor.chest.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
	});
	test("Leg Armor", async () => {
		const { data, error } = await api.cosmetics.armor.leg.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
	});
	test("Shoulder Armor", async () => {
		const { data, error } = await api.cosmetics.armor.shoulder.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
	});
	test("Misc Armor", async () => {
		const { data, error } = await api.cosmetics.armor.misc.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
		expect(
			data?.length,
			"A new cosmetic piece that does not match the filters has might have been added to the game. Either add a new filter case or increment the number if its an anomaly",
		).toBe(9);
	});
});
