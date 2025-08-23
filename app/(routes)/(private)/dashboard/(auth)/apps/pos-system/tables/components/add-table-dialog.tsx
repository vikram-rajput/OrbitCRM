import React from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TableCategory } from "@/app/(routes)/dashboard/(auth)/apps/pos-system/store";

type AddTableDialog = {
  tableCategories: TableCategory[];
};

export default function AddTableDialog({ tableCategories }: AddTableDialog) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          <span className="hidden sm:inline">Add Table</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Table</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="table-name">Table Name</Label>
            <Input id="table-name" placeholder="e.g. Table 7" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="table-section">Section</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent>
                {tableCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
