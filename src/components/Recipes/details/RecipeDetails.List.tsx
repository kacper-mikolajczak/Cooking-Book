import React from "react";

interface ListItem {
  id: string;
  value: string;
}

const List = ({
  items,
  error,
  ordered,
}: {
  items: ListItem[];
  error: string;
  ordered: boolean;
}) => {
  return (
    <div>
      {ordered ? (
        <>
          {items?.length > 0 ? (
            <ol>
              {items.map((ing) => (
                <li key={ing.id}>{ing.value}</li>
              ))}
            </ol>
          ) : (
            <p>{error}</p>
          )}
        </>
      ) : (
        <>
          {items?.length > 0 ? (
            <ul>
              {items.map((ing) => (
                <li key={ing.id}>{ing.value}</li>
              ))}
            </ul>
          ) : (
            <p>{error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default List;
