---
title: "A Custom React Grid: Search and Sort (Part 3)"
date: "2020-07-21"
thumbnail: serverUrlPlaceHolder/images/reactgrid/grid-series-3.png
tags:
  - react
  - grid
  - table
  - search
  - sort
related:
  - custom-grid-accessibility
  - custom-grid
  - custom-grid-pagination
---

# Let's continue with part 3 of this Grid series. We populated a grid with API data and added pagination to it in the previous lessons. Now we add two basic functionalties in Search and Sort of all columns.

Thanks to the first two parts, we have a grid with data loaded from the World Cup and api, and it has dynamic pagination introduced. We will now add Search and Sort functionalities to our grid. The code for this part is available [here](https://github.com/sandeepap11/example-code/tree/gridseries-blog-3). So, without further ado let's get started.

We only need to make changes in two files - viz., GridMain and Grid. Let's start with Search which is probably more trivial. In Grid component, we will add a local search text state, and then define a function to set the text on change of the text input. This method will also reset the page number to 1 and also set the search text in the main parent component through props. Note that we will have an on change search instead of on submit. If you're using an api for search and you need this to be on submit, then you will have to define another method. Also, the parent component method would have to make that api call. These points and the presentational change are shown below from a code point of view.

```
// Grid.js snippet

const [searchText, setSearchText] = useState("");
...
  const onSearch = text => {
  setSearchText(text);
  updateSearchText(text);
  setPageNumber(1);
};
```

... (rest omitted for brevity in archive copy)
