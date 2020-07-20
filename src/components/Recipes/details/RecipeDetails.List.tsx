import React from "react";

interface ListItem {
  id: string;
  value: string;
}

const List = ({
  items,
  error,
  variant,
}: {
  items: ListItem[];
  error: string;
  variant: string;
}) => {
  return (
    <div>
      {items?.length > 0 ? (
        <ul>
          {items.map((ing) => (
            <li key={ing.id}>{ing.value}</li>
          ))}
        </ul>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default List;
