import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../../../components/button";
import { Card, CardContent } from "../../../../components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/dialog";
import { AddProductForm } from "../add-product-form/add-product-form";
import { Link } from "react-router";

export function QuickActions() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="shadow-none">
      <div className="border-b px-6 pb-2 pt-0">
        <h2 className="text-lg font-bold">Quick actions</h2>
      </div>
      <CardContent className="px-6 pt-6 pb-0 font-medium">
        <div className="flex flex-wrap gap-4">
          
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/products">
              <Plus size={16} />
              View all products
            </Link>
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                Add new product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add new product</DialogTitle>
                <DialogDescription>
                  Create a new product in the system. New products are inactive by default.
                </DialogDescription>
              </DialogHeader>
              <AddProductForm />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
