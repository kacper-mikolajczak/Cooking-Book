##TODO:

- SearchBar -- DONE
- Likes -- DONE
- Styling Details & Comments X <-- Working on it
- Editing X DO THIS PAGE (encapsulate recipeForm in order to use it in many places)
- Buttons Actions X
- Avatar menu styles
- Color theme
- Titles
- Where to place an image?

Edit has its own page
View has its own page? Or just a preview?

View vs Preview:

- view has comments section

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
