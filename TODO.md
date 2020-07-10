## In views:

### Main:

- Top Recipes List?

### Header:

- Searchbar for searching recipes
- search only in category? ( Home -> user, Landing -> All)
- advanced search?

### Home:

- Add new recipe
- Edit your recipes
- View details

### Account:

- No more plans here at least for now

### Admin:

- User List View
- Recipes List View
- Combine ^ those two into one thing ( recipes under user that owns them)
- Delete/Update(?) user/recipe

### Recipes:

- Filtering? Sorting?
- Commenting?
- Likes or Stars? <- Likes are simpler

## DB SCHEMAS:

### Recipes:

- uid
- title
- desc
- user
- createdAt
- editedAt
- deletedAt
- likes ( just a number or separate object with users uids?)
- ingredients
- steps
- photoUrl
- comments

### Users:

- uid
- name
- surname
- email
- recipes (Ref)
- recipesLikes? (Ref)
- createdAt
- photoUrl???
