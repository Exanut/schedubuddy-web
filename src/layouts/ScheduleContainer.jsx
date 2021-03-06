import { Card, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import AliasDesc from "components/AliasDesc";
import Paging from "components/Paging";
import Schedule from "components/Schedule";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    backgroundColor: "#EDECEC",
    display: "flex",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
});

const ScheduleContainer = ({
  courseOrder,
  schedules,
  aliases,
  errmsg,
  showInstructorPref,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);

  const handlePageChange = (_e, value) => {
    // onChange called with null value if elipses is clicked
    if (value !== null) {
      setPage(value - 1);
    }
  };

  const scheduleHasAliases = (schedule) => {
    for (let i = 0; i < schedule.length; i++) {
      const classObj = schedule[i];
      if (classObj.objects.class in aliases) return true;
    }
    return false;
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Grid container direction="column" className={classes.content}>
          {schedules.length > 0 && (
            <Paging onChange={handlePageChange} pages={schedules.length} />
          )}
          {schedules.length ? (
            <Schedule
              courseOrder={courseOrder}
              jsonSched={schedules[page]}
              aliases={aliases}
              showInstructorPref={showInstructorPref}
            />
          ) : (
            <Typography variant="h5">
              <div align="center">{errmsg}</div>
            </Typography>
          )}
          {Object.keys(aliases)?.length > 0 && scheduleHasAliases(schedules[page]) && (
            <AliasDesc aliases={aliases} schedule={schedules[page]} />
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ScheduleContainer;
