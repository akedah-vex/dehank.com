export const decapitalize = (string) => {
  if (!string) return "";

  string = string.split("");
  string[0] = string[0].toLowerCase();

  return string.join("");
};

export const capitalize = (string) => {
  if (!string) return "";

  string = string.split("");
  string[0] = string[0].toUpperCase();

  return string.join("");
};
