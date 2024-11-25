import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";
import { expect, test } from "vitest";
import { createMatrix } from "./matrix-calculations";

test("Create matrix from variables and interactions", () => {
  const variables: ICsvVariable[] = [
    {
      sustainability: ["Ecologic"],
      category: "Packaging material",
      id: 45,
      variable: "Use of recycled materials",
      variableSource: [],
      description: "",
      descriptionSource: "",
      country: "",
      packagedProduct: "",
    },
    {
      sustainability: ["Ecologic"],
      category: "End of life",
      id: 69,
      variable: "Recyclability",
      variableSource: [],
      description: "",
      descriptionSource: "",
      country: "",
      packagedProduct: "",
    },
    {
      sustainability: ["Social"],
      category: "Consumer–packaging interaction",
      id: 17,
      variable: "Consumer perceptions",
      variableSource: [],
      description: "",
      descriptionSource: "",
      country: "",
      packagedProduct: "",
    },
  ];

  const interactions: ICsvInteraction[] = [
    {
      variableId: 45,
      variable: "Use of recycled materials",
      impactVariableId: 69,
      impactVariable: "Recyclability",
      value: "",
      valueSelfDefined: -1,
      source: "",
      description: "",
    },
    {
      variableId: 45,
      variable: "Use of recycled materials",
      impactVariableId: 17,
      impactVariable: "Consumer perceptions",
      value: "",
      valueSelfDefined: 2,
      source: "",
      description: "",
    },
    {
      variableId: 69,
      variable: "Recyclability",
      impactVariableId: 45,
      impactVariable: "Use of recycled materials",
      value: "",
      valueSelfDefined: 1,
      source: "",
      description: "",
    },
  ];

  const matrixValues = createMatrix(variables, interactions).map((row) =>
    row.map((entry) => (entry ? entry.value : null)),
  );

  expect(matrixValues).toStrictEqual([
    [null, 45, 69, 17, null],
    [45, null, -1, 2, 3],
    [69, 1, null, null, 1],
    [17, null, null, null, 0],
    [null, 1, 1, 2, null],
  ]);
});
