import { treaty } from "@elysiajs/eden";
import type { API } from "./src";

const api = treaty<API>("localhost:3000");

api.get().then((res) => {
	if (res.status !== 200) {
		process.exit(1);
	} else {
		process.exit(1);
	}
});
