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
// Note that updateSearchText and setPageNumber come from the main component.
  const onSearch = text => {
  setSearchText(text);
  updateSearchText(text);
  setPageNumber(1);
};
...
// Below is the presentational JSX from render method
<div className="grid-search">
<input
  type="text"
  placeholder="Type to search"
  value={searchText}
  onChange={event => onSearch(event.target.value)}
  />
 </div>
```

In the GridMain component, we will define a search text state as well. In addition, we need to write a filter method which will run when the search text isn't empty, and look for the search text in all columns since we are performing this search on all columns. Below is one way to do this.

```
// GridMain.js Snippet

...
  const [searchText, setSearchText] = useState("");
...
// The filter method as we discussed
...
if (filteredMatches && searchText && searchText !== "")
filteredMatches = filteredMatches.filter(
  match =>
    match.gameNumber.toString().includes(searchText) ||
    match.dateString.toLowerCase().includes(searchText.toLowerCase()) ||
    match.stage_name.toLowerCase().includes(searchText.toLowerCase()) ||
    match.location.toLowerCase().includes(searchText.toLowerCase()) ||
    match.venue.toLowerCase().includes(searchText.toLowerCase()) ||
    match.home_team_country
      .toLowerCase()
      .includes(searchText.toLowerCase()) ||
    match.away_team_country
      .toLowerCase()
      .includes(searchText.toLowerCase()) ||
    match.score.toLowerCase().includes(searchText.toLowerCase()) ||
    match.attendance.toLowerCase().includes(searchText.toLowerCase())
 );
```

We just have to pass the setPageNumber and setSearchText methods to the Grid component, and the search should start to work as expected.

Now onto the sort one. We'll run this in the reverse order. Let's do the main component first and then the child. Firstly, we will define two states - one to hold the header of the column being sorted and the other for the direction - ascending or descending. The selected header as well as the setter methods for the states will be sent as props to the Grid component. Along with this, we need a sort method on the main component (similar to how we had a filter method for search) to sort our list based on the column being sorted and the sort direction. I'm sure you could improve this method but at this point all we are doing is sorting based on the headers when the sort directions are given. Below are the code changes.

```
// GridMain.js Snippet

...
const [sortHeader, setSortHeader] = useState("");
const [sortDirection, setSortDirection] = useState("");
...
// Sort method on filteredMatches when soert header and direction iare defined
if (
  sortHeader &&
  sortDirection &&
  sortHeader !== "" &&
  (sortDirection === "ASC" || sortDirection === "DESC")
 )
  filteredMatches = filteredMatches.sort((matchA, matchB) =>
    sortDirection === "ASC"
      ? matchA[sortHeader] > matchB[sortHeader]
        ? 1
        : -1
      : matchA[sortHeader] > matchB[sortHeader]
      ? -1
      : 1
  );
...
// Additional props to the Grid component for Search and Sort
<Grid
matches={matchesToShow}
rowsPerPage={ROWS_PER_PAGE}
updateSearchText={setSearchText}
setPageNumber={setPageNumber}
sortHeader={sortHeader}
setSortHeader={setSortHeader}
setSortDirection={setSortDirection}
/>
```

In the Grid component, first we'll define a Sort Handle which will now represent the sort button for every column and make the sorting work on click. It will take 3 props - column name, currently selected sort header and a method to be fired when the button is clicked upon. This will also have a local state for sort direction. Initially this will be empty and show the up-down arrow icon. On click, firstly it will change to 'ASC' with up arrow and then to 'DESC' on next click with down arrow. On subsequent clicks, it will toggle between 'ASC' and 'DESC'. If any other column sort icon is clicked, the icons will reset to up-down. Note that the sorting method will be called on every click.

```
// Grid.js Snippet

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown
} from "@fortawesome/free-solid-svg-icons";
...
// Sort Handle Component
const SortHandle = ({ parameter, sortHeader, onSort }) => {
  const [sortColumnOrder, setSortColumnOrder] = useState("");
  const changeSortOrder = () => {
    const sortDirection =
      parameter !== sortHeader
        ? "ASC"
        : sortColumnOrder === "ASC"
        ? "DESC"
        : sortColumnOrder === "DESC"
        ? "ASC"
        : "ASC";
    setSortColumnOrder(sortDirection);
    onSort(parameter, sortDirection);
  };
  return (
    <div className="grid-geader-sort" onClick={changeSortOrder}>
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
    </div>
  );
};
```

Let's now get into the Grid component. We'll add the SortHandle component (these will basically act as sort buttons) alongside every column name. To every SortHandle component we will pass the props - current column, selected sortHeader from GridMain and a method to sort. We need to define this method similar to the search method. On sorting, we will set the current column as sort header, and the sort direction based on the local state of SortHandle for that component. We will also reset the page number to 1. All these, along with search will make the Grid component code look like this -

```
// Grid.js Snippet

...
const Grid = ({
  matches,
  rowsPerPage,
  updateSearchText,
  setPageNumber,
  sortHeader,
  setSortHeader,
  setSortDirection
}) => {
  const [searchText, setSearchText] = useState("");
  let emptyRows = [];
  if (rowsPerPage > matches.length) {
    for (let i = 0; i < rowsPerPage - matches.length; i++) {
      emptyRows.push(i);
    }
  }
  const onSearch = text => {
    setSearchText(text);
    updateSearchText(text);
    setPageNumber(1);
  };
// On Sort Method
// Uses props from GridMain to set selected sort header, direction and reset page number
  const onSort = (sortHeader, sortDirection) => {
    setSortHeader(sortHeader);
    setSortDirection(sortDirection);
    setPageNumber(1);
  };
// In the render JSX, note the use of Sort Handle on every column
  return (
   <>
       <div className="grid-search">
         <input
           type="text"
           placeholder="Type to search"
           value={searchText}
           onChange={event => onSearch(event.target.value)}
          />
        </div>
    <table className="grid-container">
      <thead>
        <tr>
          <td>
           <div className="header">
            NO.
            <SortHandle,
              parameter={"gameNumber"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          </td>
          <td>
           <div className="header">
            DATE
            <SortHandle
              parameter={"dateString"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          </td>
          <td>
           <div className="header">
            STAGE
            <SortHandle
              parameter={"stage_name"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          </td>
          <td>
           <div className="header">
            STADIUM
            <SortHandle
              parameter={"location"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          </td>
          <td>
           <div className="header">
            CITY
            <SortHandle
              parameter={"venue"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          </td>
          <td>
           <div className="header">
            TEAM 1
            <SortHandle
              parameter={"home_team_country"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          </td>
          <td>
           <div className="header">
            TEAM 2
            <SortHandle
              parameter={"away_team_country"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          </td>
          <td>
           <div className="header">
            SCORE
            <SortHandle
              parameter={"score"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          </td>
          <td>
           <div className="header">
            ATTENDANCE
            <SortHandle
              parameter={"attendance"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          </td>
        </tr>
      </thead>
      <tbody className="grid-body">
        {matches.map(match => (
          <GridRow key={match.fifa_id} match={match} />
        ))}
        {rowsPerPage > matches.length &&
          emptyRows.map(emptyRow => (
            <tr key={emptyRow} className="grid-row-empty"></tr>
          ))}
      </tbody>
    </table>
   </>
  );
};
```

That should have us sorted out on sorting! If we now want to search for USWNT games, we just need to search as USA and we will have the results of their 7 games. As a demo, I have sorted them based on most attendance (descending), and now the final game shows up on top. Note that this only one page. The picture below shows this scenario.

![final screen](serverUrlPlaceHolder/images/reactgrid/grid-series-3.png)

# That's all for the search and sort changes. We will add some basic accessibility in the next lesson. Please follow along. Thank you!
