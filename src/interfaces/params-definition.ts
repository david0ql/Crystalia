type ParamType = "number" | "string" | "boolean" | "object" | "array" | "binary";

export interface ParamDefinition {
  name: string;
  type: ParamType;
}