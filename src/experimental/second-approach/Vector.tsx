import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { BigNumber } from "mathjs";

interface IProps {
  name?: string;
  variables: string[] | number[];
  values: BigNumber[];
  onVariableSelected?: (variableIndex: number) => void;
}

/// Variables show as first column and values as second column
function Vector({ name, variables, values, onVariableSelected }: IProps) {
  return (
    <div>
      <Table className="border table-auto text-center">
        <TableCaption>{name}</TableCaption>
        <TableBody>
          {variables.map((variable, index) => (
            <TableRow key={index}>
              <TableCell className="border font-bold">{variable}</TableCell>
              <TableCell className="border">
                {values[index].toString()}
              </TableCell>
              {onVariableSelected && (
                <TableCell className="border">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-4 w-4 shrink-0 rounded-full"
                    onClick={() => {
                      if (!onVariableSelected) return;
                      onVariableSelected(index);
                    }}
                  >
                    <Plus />
                    <span className="sr-only">Increase</span>
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Vector;
