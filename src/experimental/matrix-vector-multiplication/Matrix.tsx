import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { bignumber, BigNumber } from "mathjs";
import { ITraceCalculationHoverData } from "./MatrixVectorMultiplication";

type IMatrix = BigNumber[][];

interface IProps {
  matrix: IMatrix;
  name?: string;
  variableIds: number[] | string[];
  onVariableSelected?: (variableIndex: number) => void;
  onMatrixChange?: (updatedMatrix: IMatrix) => void;
  traceCalculationHoverData?: ITraceCalculationHoverData;
}

function Matrix({
  matrix,
  name,
  variableIds,
  onVariableSelected,
  onMatrixChange,
  traceCalculationHoverData,
}: IProps) {
  const [editableMatrix, setEditableMatrix] =
    useState<(string | BigNumber)[][]>(matrix);
  const [editMode, setEditMode] = useState(false);

  const handleValueChange = (
    rowIndex: number,
    colIndex: number,
    newValue: string,
  ) => {
    const updatedMatrix = [...editableMatrix];
    updatedMatrix[rowIndex][colIndex] = newValue;
    setEditableMatrix(updatedMatrix);
  };

  const handleSave = () => {
    // When the edit mode is exited, parse the values
    const parsedMatrix = editableMatrix.map((row) =>
      row.map((value) => {
        // Replace comma with period and parse as number
        const valueWithDot = value.toString().replace(",", ".");
        return isNaN(parseFloat(valueWithDot))
          ? bignumber(0)
          : bignumber(parseFloat(valueWithDot));
      }),
    );
    setEditableMatrix(parsedMatrix);
    onMatrixChange?.(parsedMatrix);
  };

  useEffect(() => {
    setEditableMatrix(matrix);
  }, [matrix]);

  return (
    <div>
      <Table className="border text-center table-auto">
        <TableCaption>{name}</TableCaption>
        <TableBody>
          <TableRow>
            {onVariableSelected && <TableCell className="border" />}
            <TableCell className="border" />
            {variableIds.map((variable, index) => (
              <TableCell
                key={index}
                className="text-xs text-left align border font-bold"
              >
                {variable}
              </TableCell>
            ))}
          </TableRow>
          {editableMatrix.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {onVariableSelected && (
                <TableCell className="border">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-4 w-4 shrink-0 rounded-full"
                    onClick={() => onVariableSelected?.(rowIndex)}
                  >
                    <Plus />
                    <span className="sr-only">Increase</span>
                  </Button>
                </TableCell>
              )}
              <TableCell className="border font-bold text-xs text-left whitespace-nowrap">
                {variableIds[rowIndex]}
              </TableCell>
              {row.map((value, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={`border ${colIndex === traceCalculationHoverData?.variableIndex && "bg-blue-200"}`}
                >
                  {rowIndex === colIndex ? (
                    <div className="truncate w-20 font-bold">
                      {value.toString()}
                    </div>
                  ) : editMode ? (
                    <input
                      type="text"
                      value={value.toString()}
                      onChange={(e) =>
                        handleValueChange(rowIndex, colIndex, e.target.value)
                      }
                      className="w-20 text-center border-none outline-none"
                      pattern="^[0-9]*[.,]?[0-9]+$" // Accepts numbers with periods or commas
                      inputMode="decimal"
                    />
                  ) : (
                    <div className="truncate w-20">{value.toString()}</div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {onMatrixChange ? (
        <div className="flex items-center space-x-2 mt-5">
          <Switch
            id="edit-mode-switch"
            checked={editMode}
            onCheckedChange={() => {
              setEditMode(!editMode);
              if (editMode) {
                handleSave();
              }
            }}
          />
          <Label htmlFor="edit-mode-switch">
            {editMode ? "Deactivate to save changes" : "Activate edit mode"}
          </Label>
        </div>
      ) : null}
    </div>
  );
}

export default Matrix;
