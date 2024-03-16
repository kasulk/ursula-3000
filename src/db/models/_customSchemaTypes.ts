/// Custom SchemaType, accepts number or null
/// and returns number or null
export const NumberOrNull = {
  type: Number,
  set: (value: number | null) => (typeof value === "number" ? value : null),
};
