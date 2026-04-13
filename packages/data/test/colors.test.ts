import { describe, expect, test } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { api as API } from "../src";

const api = treaty(API);

describe("Colour Palettes Router", () => {
	test("Colour Palettes List", async () => {
		const { data, error } = await api.palettes.get();

		expect(error).toBeNull();
		expect(data).toBeArray();
	});
	test("Valid Colour Palette", async () => {
		const { data, error } = await api.palettes({ palette: "Tenno" }).get();

		expect(error).toBeNull();
		expect(data).toStrictEqual({
			uniqueName:
				"/Lotus/Types/StoreItems/SuitCustomizations/ColourPickerDefaultsItemA",
			name: "Tenno",
			description:
				"Unlocks additional color options reflecting the default colors used on each standard Warframe.",
			codexSecret: false,
			hexColours: [
				{ value: "0x00DCCC9A" },
				{ value: "0x0083684F" },
				{ value: "0x00919A9C" },
				{ value: "0x0001B36C" },
				{ value: "0x003F7BC1" },
				{ value: "0x006C6C6C" },
				{ value: "0x00567B8D" },
				{ value: "0x00D0D0D0" },
				{ value: "0x00F8CF6F" },
				{ value: "0x00064661" },
				{ value: "0x00BC9E65" },
				{ value: "0x00BABABA" },
				{ value: "0x007D7B78" },
				{ value: "0x00F7780F" },
				{ value: "0x00FF7201" },
				{ value: "0x00B3B3B3" },
				{ value: "0x00535353" },
				{ value: "0x00686868" },
				{ value: "0x009A2B23" },
				{ value: "0x000158FF" },
				{ value: "0x00FFFFFF" },
				{ value: "0x00457D9E" },
				{ value: "0x005D6C6F" },
				{ value: "0x00C4B388" },
				{ value: "0x000234B7" },
				{ value: "0x00B0BDB8" },
				{ value: "0x007D6F65" },
				{ value: "0x00277883" },
				{ value: "0x00B54542" },
				{ value: "0x00FFFFFF" },
				{ value: "0x00617B91" },
				{ value: "0x007BBDD7" },
				{ value: "0x006F4F3B" },
				{ value: "0x002EFFF1" },
				{ value: "0x0048DAE1" },
				{ value: "0x008398B0" },
				{ value: "0x004F5461" },
				{ value: "0x00787880" },
				{ value: "0x0068373C" },
				{ value: "0x00FF8A01" },
				{ value: "0x00E9E4DA" },
				{ value: "0x007D8894" },
				{ value: "0x00A06F50" },
				{ value: "0x008A8580" },
				{ value: "0x00014BBF" },
				{ value: "0x00808080" },
				{ value: "0x0041423E" },
				{ value: "0x0054BCB0" },
				{ value: "0x0031B891" },
				{ value: "0x000158FF" },
				{ value: "0x00ECE4DA" },
				{ value: "0x0042534E" },
				{ value: "0x001F2D3C" },
				{ value: "0x00E9FB10" },
				{ value: "0x0001B8FF" },
				{ value: "0x009E8F65" },
				{ value: "0x004B6575" },
				{ value: "0x00EACD75" },
				{ value: "0x00BABABA" },
				{ value: "0x000061F2" },
				{ value: "0x00728A9C" },
				{ value: "0x00E8E9D2" },
				{ value: "0x00524F4B" },
				{ value: "0x00AA8D9C" },
				{ value: "0x00460DAE" },
				{ value: "0x00FA4D40" },
				{ value: "0x00948F8D" },
				{ value: "0x0065615D" },
				{ value: "0x004085CA" },
				{ value: "0x00005DFD" },
				{ value: "0x004E4947" },
				{ value: "0x00EC7546" },
				{ value: "0x000CBDB0" },
				{ value: "0x00F7E8B7" },
				{ value: "0x00FD682E" },
				{ value: "0x00788588" },
				{ value: "0x004E4B46" },
				{ value: "0x00C66550" },
				{ value: "0x00F8E4C2" },
				{ value: "0x00280DAE" },
				{ value: "0x0041675C" },
				{ value: "0x00916F4F" },
				{ value: "0x005D6153" },
				{ value: "0x00C18A3D" },
				{ value: "0x00F40000" },
				{ value: "0x005D6572" },
				{ value: "0x00F6F2E4" },
				{ value: "0x006CB3F7" },
				{ value: "0x00E87D96" },
				{ value: "0x0080B7E2" },
			],
		});
	});
	test("Invalid Colour Palette", async () => {
		const { data, error } = await api
			.palettes({ palette: "FakePalette" })
			.get();

		expect(error?.status).toBe(400);
		expect(error?.value).toBe("FakePalette is not a palette");
		expect(data).toBeNull();
	});
});
