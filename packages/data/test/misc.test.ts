import { describe, expect, test } from "bun:test";
import { treaty } from "@elysiajs/eden";
import packageJson from "../package.json";
import { api as API } from "../src";

const api = treaty(API);

describe("Main", () => {
	test("Version", async () => {
		const { data, error } = await api.version.get();

		expect(error).toBeNull();
		expect(data).toBe(packageJson.version);
	});
	test("LastUpdate", async () => {
		const { data, error } = await api.lastUpdate.get();

		expect(error).toBeNull();
		expect(data).toBeNumber();
	});
});
