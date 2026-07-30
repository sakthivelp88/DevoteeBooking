import api from "@/services/api/api";

const API = "/admin/settings/appearance";

export const getTheme = () =>
	api.get(API, {
		withCredentials: true,
	});

export const updateTheme = (theme) =>
	api.put(
		API,
		{ theme },
		{
			withCredentials: true,
		}
	);
