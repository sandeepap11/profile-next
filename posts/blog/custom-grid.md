---
title: "A Custom React Grid: Load Data (Part 1)"
date: "2020-07-07"
thumbnail: serverUrlPlaceHolder/images/reactgrid/grid-series-1.png
tags:
  - react
  - grid
  - table
  - api
related:
  - custom-grid-pagination
  - custom-grid-search-sort
  - custom-grid-accessibility
---

# This is a series on what I have come to see as a very common requirement in most B2B applications - a Grid. We will build a simple custom grid using React Hooks and then we will add functionalities as we go.

Grids are one of the most (if not the most) used medium of displaying structured data to users. In React, there are third party components available to make your job easier. In my opinion, you should go for these only when there is a large amount of data to be displayed (e.g., data with more than 15-20 columns or with dynamic column headers or both). react-virtualized by Brian Vaughn and fixed-data-table-2 are some of the popular packages that you could consider for displaying large amount of data. With these packages, note that every cell is a component and if you do not control the rendering, every cell will render on every change which will slow down the app. Of course, there are options to control the rendering and those should be used wisely. In this series though, we will build a small grid with known table headers, and discuss common functionalities like pagination, search, sort, etc. The code is available for reference [here](https://github.com/sandeepap11/example-code/tree/gridseries-blog-1/src/components/Grid). This uses matches data from [here](https://worldcup.sfg.io/) for the FIFA World Cup 2019 held in France. This is a really nice api and a personal favourite for me 😊. In this particular part, we will just call the api and load the data into our grid showing a few columns.To get started swiftly, I have used the create react-app utility to bootsrap the project. All react files pertaining to this project are under the src/components/Grid folder. GridMain component will be our parent component which will call the external api, and hold the methods of any data manipulation. Grid component will be the main component for our reusable grid while GridRow component will represent each row of the grid. There is also a common CSS file.

# Fetch and Format Data

Let's call the api using the useEffect and store in component state using the useState hook.

```
// GridMain.js snippet

useEffect(() => {
 fetch("https://worldcup.sfg.io/matches")
   .then(response => response.json())
   .then(matches => {
     setMatches(matches);
  });
}, []);

```

The api provides a large number of details in the form of an array of objects. As mentioned, we are considering only a few like Date, Stage (Group Stage, Round of 16, Quarter Final and so on), Stadium, City, the Teams, obviously the full-time score and the attendance. There are a few changes that I want to make for some of the values - I don't want the year value to be present in date as well as format the date, I want "First Stage" to be called "Group Stage", "Match for third place" as "Third Place", and I also want to form the score attribute in a \<Home Score-Away Score\> kind of format. So let's use the map method to achieve that.

```
//GridMain.js snippet

let filteredMatches = matches.map((match, index) => {
  const matchDate = new Date(match.datetime);
  const dateValue = matchDate.toDateString().replace("2019", "");
  const timeString = matchDate.toTimeString();
  const dateString = `${dateValue.slice(
    4,
   dateValue.length
  )} ${timeString.slice(0, 5)}`;
  const gameNumber = index + 1;
  const stage_name =
    gameNumber > 36
      ? match.stage_name === "Match for third place"
        ? "Third Place"
        : match.stage_name
      : "Group Stage";
  return {
    ...match,
    gameNumber,
    dateString,
    stage_name,
    score: `${match.home_team.goals}-${match.away_team.goals}`
  };
});
```

Now we just need to pass the resultant array to our Grid component which will take care of forming the grid table.

```
// GridMain.js snippet

return (
  <div className="grid-main">
    <h1>All World Cup Matches 2019</h1>
    {matches.length > 0 && (
      <>
        <Grid matches={filteredMatches} />
      </>
    )}
  </div>
)
```

# Grid Component

At this point, the main Grid component will just structure the table headers and apply the CSS classes. The data will be displayed using the GridRow component.

```
// Grid.js snippet

return (
<table className="grid-container">
<thead>
<tr className="grid-header">
  <th>NO.</th>
  <th>DATE</th>
  <th>STAGE</th>
  <th>STADIUM</th>
  <th>CITY</th>
  <th>TEAM 1</th>
  <th>TEAM 2</th>
  <th>SCORE</th>
  <th>ATTENDANCE</th>
</tr>
</thead>
<tbody className="grid-body">
  {matches.map(match => (
    <GridRow key={match.fifa_id} match={match} />
  ))}
</tbody>
  </table>
)
```

The GridRow component will represent each row. Every object in our matches data array will be iterated over and will display the data based on each object. For now it's just a display component as below.

```
// GridRow.js

import React from "react";
const GridRow = ({ match }) => {
  return (
    <tr>
      <td>{match.gameNumber}</td>
      <td>{match.dateString}</td>
      <td>{match.stage_name}</td>
      <td>{match.location}</td>
      <td>{match.venue}</td>
      <td>{match.home_team_country}</td>
      <td>{match.away_team_country}</td>
      <td>{match.score}</td>
      <td>{match.attendance}</td>
    </tr>
  );
};
export default GridRow;
```

It might seem excessive that we are using separate classes to style each column but this way we have more control. If the Qatar World Cup hasn't taken place yet, you should see a result something like below.

![final screen](serverUrlPlaceHolder/images/reactgrid/grid-series-1.png)

# That's it for this post. It won't seem like much. We will add a bit more functionalities next. I hope you'd follow along.
