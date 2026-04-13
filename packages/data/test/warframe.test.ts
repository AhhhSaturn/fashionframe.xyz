import { describe, expect, test } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { api as API } from "../src";

const api = treaty(API);

describe("Warframe Router", () => {
	test("Warframe List", async () => {
		const { data, error } = await api.warframes.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
	});
	test("Valid Warframe", async () => {
		const { data, error } = await api.warframes({ warframe: "Ash" }).get();

		expect(error).toBeNull();
		expect(data).toStrictEqual(
			(await Bun.file("modules/Warframes.json").json())["Ash"],
		);
	});
	test("Invalid Warframe", async () => {
		const { data, error } = await api
			.warframes({ warframe: "FakeFrame" })
			.get();

		expect(error?.status).toBe(400);
		expect(error?.value).toBe("FakeFrame is not a warframe");
		expect(data).toBeNull();
	});
});
