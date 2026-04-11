import type { ElysiaOpenAPIConfig } from "@elysiajs/openapi";
import packageJson from "../package.json";

export const openapiConfig: ElysiaOpenAPIConfig = {
	scalar: {
		mcp: {
			disabled: true,
		},
		agent: {
			disabled: true,
		},
	},
	documentation: {
		info: {
			title: "@fashionframe.xyz/data | Warframe Cosmetic API",
			description:
				"The `token` header is not needed for regular use. It is only for an authorized server to bypass rate limiting.",
			version: packageJson.version,
			license: {
				name: "MIT No AI",
				url: "https://github.com/AhhhSaturn/fashionframe.xyz/blob/815c34c397e313e11b61a96d622dd9eb067ebfa2/LICENSE",
			},
		},
	},
};
