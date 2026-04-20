import type { api } from "./src";

type Module =
	| "Customs"
	| "Drones"
	| "Flavour"
	| "FusionBundles"
	| "Gear"
	| "Keys"
	| "Recipes"
	| "Regions"
	| "RelicArcane"
	| "Resources"
	| "Sentinels"
	| "SortieRewards"
	| "Upgrades"
	| "Warframes"
	| "Weapons"
	| "Manifest";

type Warframe = {
	uniqueName: string;
	name: string;
	parentName: string;
	description: string;
	health: number;
	shield: number;
	armor: number;
	stamina: number;
	power: number;
	codexSecret: boolean;
	masteryReq: number;
	sprintSpeed: number;
	passiveDescription: string;
	exalted: string[];
	abilities: [
		{
			abilityUniqueName: string;
			abilityName: string;
			description: string;
		},
		{
			abilityUniqueName: string;
			abilityName: string;
			description: string;
		},
		{
			abilityUniqueName: string;
			abilityName: string;
			description: string;
		},
		{
			abilityUniqueName: string;
			abilityName: string;
			description: string;
		},
	];
	productCategory: "Suits" | "MechSuits" | "SpaceSuits";
};

type Flavour = {
	uniqueName: string;
	name: string;
	description: string;
	hexColours?: { value: string }[];
	excludeFromCodex?: boolean;
	codexSecret: boolean;
};

type ColourPalette = {
	uniqueName: string;
	name: string;
	description: string;
	hexColours: { value: string; selected?: boolean }[];
	excludeFromCodex: boolean;
	codexSecret: boolean;
};

type GenericEntry = {
	uniqueName: string;
	name: string;
	description: string;
	codexSecret: boolean;
};

type API = typeof api;
