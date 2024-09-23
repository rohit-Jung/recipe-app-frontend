import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { IShoppingList } from "@/types";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import {
  useDeleteShoppingList,
  useDeleteShoppingListItem,
  useUpdateShoppingListItem,
} from "@/services/api/shopping_lists";
import { Button } from "./ui/Button";
import DeleteConfirm from "./DeleteConfirm";

const ShoppingListAccordian: FC<IShoppingList> = ({
  id,
  title,
  ingredient_items,
}) => {
  const { mutate: deleteList } = useDeleteShoppingList();
  const { mutate: deleteItem } = useDeleteShoppingListItem();
  const { mutate: updateItem } = useUpdateShoppingListItem();

  const handleCheckItem = (itemId: string, checked: boolean) => {
    const data = { checked };
    updateItem({ id: itemId, data });
  };

  const handleDeleteItem = (itemId: string) => {
    deleteItem(itemId);
  };

  const handleDeleteList = (id: string) => {
    deleteList(id);
  };

  return (
    <>
      <Accordion
        type="single"
        className="bg-slate-50 w-full px-8 py-6 rounded-md shadow-md "
        collapsible
        defaultValue="item-1"
        key={id}
      >
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="no-underline">
            <h1 className="text-3xl font-bold text-black ">{title}</h1>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-3">
              {ingredient_items.map((item) => (
                <span
                  className="flex items-center justify-between gap-2 mb-2"
                  key={item.id}
                >
                  <div className="flex items-center gap-3 justify-center">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={(checked) =>
                        handleCheckItem(item.id!, Boolean(checked))
                      }
                    />
                    <p>
                      {item.ingredient} | {item.quantity} {item.measurement}
                    </p>
                  </div>
                  <DeleteConfirm
                    trigger={<MdDeleteOutline />}
                    handleConfirm={() => handleDeleteItem(item.id!)}
                    label="Are you sure you want to delete this item?"
                    description="This item will be deleted from your shopping list permanently."
                  />
                </span>
              ))}
            </div>

            <DeleteConfirm
              trigger={
                <div className="flex items-center justify-end gap-3 mt-2">
                  <Button
                    className="inline-flex gap-3 items-center"
                  >
                    <h1>Delete List</h1>
                    <MdDelete />
                  </Button>
                </div>
              }
              handleConfirm={() => handleDeleteList(id!)}
              label="Are you sure you want to delete this list?"
              description="All items from your shopping list permanently."
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ShoppingListAccordian;
