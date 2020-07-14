##TODO:

- SearchBar -- Problem with dynamic view of searched recipes. Redirect to search is kinda a solution
- Likes -- done? At least I hope so
- Styling Details & Comments X
- Editing X
- Buttons Actions X
- ...
- max description length set to ~200? -- Workaround with height property

## In views:

_??_ = Optional

### Main:

- Top Recipes List

### Header:

- Searchbar for searching recipes
- search only in category ( Home -> user, Landing -> All)
- advanced search _??_

### Home:

- Add new recipe
- Edit your recipes\*\*
- View details

### Account:

- No more plans here at least for now

### Admin:

- User List View
- Recipes List View
- Combine ^ those two into one thing ( recipes under user that owns them) _??_
- Delete/Update user( _??_ )/recipe

### Recipes:

- Filtering and Sorting
- Commenting _??_
- Likes or Stars _??_ <- Likes are simpler

## DB SCHEMAS:

### Recipes:

**Bold** = Set by the user  
_??_ = Optional

- uid
- **title**
- **desc**
- user
- createdAt
- editedAt
- deletedAt
- likes ( just a number or separate object with users uids?)
- **ingredients**
- **steps**
- **nutrition Table** _??_
- **photoUrl**
- comments _??_

### Users:

**Bold** = Set by the user  
_??_ = Optional

- uid
- **firstName**
- role?
  - regular
  - admin
- **lastName**
- **email**
- recipes (Ref) _??_
- recipesLikes (Ref) _??_
- createdAt
- **photoUrl**
