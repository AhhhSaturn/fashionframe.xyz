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
		const { data, error } = await api.cosmetics.syandana.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
	});
	test("Shoulder Armor", async () => {
		const { data, error } = await api.cosmetics.armor.shoulder.get();

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
	test("Valid Helmet Armor", async () => {
		const { data, error } = await api.cosmetics.armor
			.helmet({ warframe: "Ash" })
			.get();

		expect(error).toBeNull();

		const ashHelmet = data?.filter(
			(warframe) => warframe.name === "Ash Helmet",
		);
		expect(ashHelmet?.length).toBe(1);
	});
	test("Invalid Helmet Armor", async () => {
		const { data, error } = await api.cosmetics.armor
			.helmet({ warframe: "Ash" })
			.get();

		expect(error).toBeNull();

		const ashHelmet = data?.filter(
			(warframe) => warframe.name === "FakeFrame Helmet",
		);
		expect(ashHelmet?.length).toBe(0);
	});
	test("Valid Skin", async () => {
		const { data, error } = await api.cosmetics.skin({ warframe: "Ash" }).get();

		expect(error).toBeNull();

		const ashSkin = data?.filter((warframe) => warframe.name === "Ash Skin");
		expect(ashSkin?.length).toBe(1);
	});
	test("Invalid Skin", async () => {
		const { data, error } = await api.cosmetics.skin({ warframe: "Ash" }).get();

		expect(error).toBeNull();

		const ashSkin = data?.filter(
			(warframe) => warframe.name === "FakeFrame Skin",
		);
		expect(ashSkin?.length).toBe(0);
	});
});
