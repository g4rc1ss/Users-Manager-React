export let URL_API_NODE = "";

export const LoadConfigurationByEnvironment = (): void => {
	if (process.env.NODE_ENV === "development") {
		developmentFields();
	} else if (process.env.NODE_ENV === "test") {
		testFields();
	} else {
		productionFields();
	}
};

function developmentFields(): void {
	URL_API_NODE = "http://localhost:55434";
}

function testFields(): void {
	URL_API_NODE = "http://localhost:55434";
}

function productionFields(): void {
	URL_API_NODE = "http://46.105.28.118:55434";
}
