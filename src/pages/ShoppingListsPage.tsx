import { Breadcrumbs, Container, ShoppingListAccordian } from "@/components";
import { BreadcrumbItemProps } from "@/components/BreadCrumbs";
import {
  useGetAllShoppingLists,
} from "@/services/api/shopping_lists";
import { IShoppingList } from "@/types";
import { FC, useEffect, useState } from "react";

interface ShoppingListsPageProps {}

const ShoppingListsPage: FC<ShoppingListsPageProps> = () => {
  const [shoppingList, setShoppingList] = useState<IShoppingList[] | null>(
    null
  );
  const { data, isSuccess } = useGetAllShoppingLists();

  useEffect(() => {
    if (data && isSuccess) {
      setShoppingList(data);
    }
  }, [data, isSuccess]);

  const breadcrumbItems: BreadcrumbItemProps[] = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Shopping Lists",
      link: "/shopping-lists",
    },
  ];

  return (
    <>
      <Container>
        <div className="space-y-3">
          <div className="px-8 py-10 shadow-md rounded-br-3xl bg-[#F79F1A]">
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-3xl font-bold text-white">Shopping Lists</h1>
          </div>
          {shoppingList &&
            shoppingList.map((list) => (
              <ShoppingListAccordian
                key={list.id}
                id={list.id}
                title={list.title}
                ingredient_items={list.ingredient_items}
              />
            ))}
        </div>
      </Container>
    </>
  );
};

export default ShoppingListsPage;
