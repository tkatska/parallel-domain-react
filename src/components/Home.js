import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import List from "./JobsList";
import FilterContainer from "./FilterContainer";
import mui from "../theme/mui";

function Home() {
  const paralleldomainURL =
    "https://api.lever.co/v0/postings/paralleldomain?mode=json";

  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [groupJobs, setGroupJobs] = useState({});

  useEffect(() => {
    setIsloading(true);
    fetch(paralleldomainURL)
      .then((d) => d.json())
      .then((response) => setData(response))
      .catch((e) => console.error(e))
      .then(() =>
        setTimeout(() => {
          setIsloading(false);
        }, 1000)
      );
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("0");
  const [selectedLocation, setSelectedLocation] = useState("0");
  const [selectedTeam, setSelectedTeam] = useState("0");
  const [uniqueCommitments, setUniqueCommitments] = useState();
  const [uniqueLocations, setUniqueLocations] = useState();
  const [uniqueTeams, setUniqueTeams] = useState();

  useEffect(() => {
    if (data) {
      setUniqueCommitments([
        ...new Set(data.map((item) => item.categories.commitment)),
      ]);
      setUniqueLocations([
        ...new Set(data.map((item) => item.categories.location)),
      ]);
      setUniqueTeams([...new Set(data.map((item) => item.categories.team))]);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      let filteredJobs = data;
      if (selectedCategory !== "0") {
        filteredJobs = filteredJobs.filter(
          (item) => item.categories.commitment === selectedCategory
        );
      }
      if (selectedLocation !== "0") {
        filteredJobs = filteredJobs.filter(
          (item) => item.categories.location === selectedLocation
        );
      }

      if (selectedTeam !== "0") {
        filteredJobs = filteredJobs.filter(
          (item) => item.categories.team === selectedTeam
        );
      }
      groupFilteredJobs(filteredJobs);
    }
  }, [selectedCategory, selectedLocation, selectedTeam, data]);

  const groupFilteredJobs = (filteredJobs) => {
    let groups = filteredJobs.reduce(function (g, i) {
      g[i.categories.team] = g[i.categories.team] || [];
      g[i.categories.team].push(i);
      return g;
    }, Object.create(null));
    setGroupJobs(groups);
  };

  return (
    <Box sx={{ maxWidth: "1024px", width: "100%", margin: "0 auto",px: 3, py: 5 }}>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>
        Open Positions
      </Typography>
      <Typography
        sx={{ textAlign: "center", maxWidth: "768px", margin: "0 auto" }}
      >
        Our data is training and testing autonomous systems at companies around
        the world. We're looking for talented visionaries to help us to expand
        our impact on the way artificial intelligence is developed.
      </Typography>
      <div className="home__loading">
        {isLoading || !data ? (
          <CircularProgress />
        ) : (
          <>
            <div className="home__filter_container">
              <p>FILTER BY:</p>
              <FilterContainer
                className={"home__filter"}
                options={uniqueTeams}
                onCategoryChange={setSelectedTeam}
                defaultOption={"ALL TEAMS"}
              />
              <FilterContainer
                className={"home__filter"}
                options={uniqueLocations}
                onCategoryChange={setSelectedLocation}
                defaultOption={"ALL LOCATIONS"}
              />
              <FilterContainer
                className={"home__filter"}
                options={uniqueCommitments}
                onCategoryChange={setSelectedCategory}
                defaultOption={"ALL WORK TYPES"}
              />
            </div>
            {Object.entries(groupJobs).map((groupItemName, index) => {
              return (
                <div key={index} className="home__groupName">
                  <Typography
                    sx={{
                      marginTop:
                        mui.components.MuiCssBaseline.styleOverrides.body
                          .paddingTop,
                      marginBottom: "10px",
                      color: "#ff9800",
                      textTransform: "uppercase",
                    }}
                  >
                    {groupItemName[0]}
                  </Typography>
                  <div>
                    {groupItemName[1].map((item) => {
                      return <List item={item} key={item.id} />;
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </Box>
  );
}

export default Home;
