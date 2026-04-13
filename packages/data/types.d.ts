type Warframe = {
	name: string;
	image: string;
	description: string;
};

type ColourPalettes = {
	uniqueName: string;
	name: string;
	description: string;
	hexColours: { value: string }[];
	excludeFromCodex: boolean;
	codexSecret: boolean;
};
