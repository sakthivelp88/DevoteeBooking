import api from "@/services/api/api";

export const getTheme = () =>
  api.get("/user/settings/appearance");

export const updateTheme = (theme) =>
  api.put("/user/settings/appearance", { theme });