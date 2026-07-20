import api from "@/services/api/api"; // or your axios instance

export const getTheme = () =>
  api.get("/user/settings/appearance");

export const updateTheme = (theme) =>
  api.put("/user/settings/appearance", { theme });


