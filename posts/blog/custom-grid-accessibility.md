---
title: "A Custom React Grid: Accessibility (Part 4)"
date: "2020-07-23"
tags:
  - react
  - grid
  - table
  - a11y
  - accessibility
related:
  - custom-grid
  - custom-grid-pagination
  - custom-grid-search-sort
---

# This is part 4 of the Grid Series. We have a grid which has data loaded from an api, and is enabled with pagination, search and sort. We will now make changes so that these functionalities are accessible for everyone.

There are no excuses for omiting accessibility (a11y) in web apps in this day and age. The grid that we have built should be no different. Use the right semantic elements as much as possible and use CSS to make them look the way you want - e.g., do not use a div for a button. Our grid already has search functionality which is accessible. Now let's make the sorting and pagination accessible as well. The code for this is available [here](https://github.com/sandeepap11/example-code/tree/gridseries-blog-4) . Let me now begin with the breakdown.

We want all our functionalities to be done via a keyboard as well. The pagination through textbox and the search already have this going for them. But the same can't be said about pagination through buttons and sorting. In fact, our pagination and sorting buttons are not even buttons, and no screen reader will recognise them as such. To address this we'll need to add aria-label, role, tabIndex, etc to these elements. But first, let's define a function that can be called by all buttons when the return (or enter) key is pressed, instead of just on click. We'll define a common method which recognises the code for return key and will run the action method only when it's true. Ideally, you could have this method in a common file, and then use it on all components. For now we'll define this in our Pagination component. You could have similar methods for esc key (for cancellation, closing forms, etc.) as well, or any other key for that matter. The method is as below.

```
// Pagination.js Snippet

...
const RETURN_KEY_CODE = 13; // Key code for Enter key
export const onReturnKeyPress = (event, actionMethod) => {
if (event.keyCode === RETURN_KEY_CODE) actionMethod();
};
```

Now that we got that out of our way, we will first use this in our PaginationControl component which we used as a common method for hopping from page to page. The code is below.

```
// Pagination.js Snippet

...
  const PaginationControl = ({ icon, onClick, isDisabled, label }) => {
    return (
      <button
        className={
          isDisabled
            ? "pagination-page-control-disabled"
            : "pagination-page-control"
        }
        onClick={() => {
          if (!isDisabled) onClick();
        }}
        onKeyDown={event =>
          onReturnKeyPress(event, () => {
            if (!isDisabled) onClick();
          })
        }
        aria-disabled={isDisabled}
        aria-label={label}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    );
  };
```

Note that we have added an onKeyDown method which will use our onReturnKeyPress method. Now whenever the return key is pressed, the onclick method will be run thereby running the pagination button methods. In addition, we will add tabIndex, role and aria-disabled attributes to help the screen readers. We've also introduces a label prop so that a description is given for the button (e.g., go to next page), and this can be used as aria-label since our button is just an icon. The aria-label provides a better description. We'll do something similar for sorting. The changes made in SortHandle will look like below.

```
// Grid.js Snippet

...
<button
  className="grid-geader-sort"
  onClick={changeSortOrder}
  onKeyDown={event => onReturnKeyPress(event, changeSortOrder)}
  aria-label={"sort by " + parameter}
>
  <FontAwesomeIcon
    icon={
      parameter !== sortHeader
        ? faSort
        : sortColumnOrder === "ASC"
        ? faSortUp
        : sortColumnOrder === "DESC"
        ? faSortDown
        : faSort
    }
  />
</button>
```

We should now be able to sort as well as paginate using shift + tab and enter. There should not be any visual difference except the outline when the buttons are focused.

# This will conclude the series for now. I might add some additiona features to this in the future. But it will be curtains on this series for now. Thank you for reading, and good day!
