import { Grid, Typography, Box } from "@material-ui/core";

const Welcome = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Box>
          <Typography variant="h2">Welcome to</Typography>
          <Typography variant="h3" color="secondary">
            <b>Job Portal</b>
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" align="center" color="text.secondary">
            A Bridge to Job Seekers and Recruiters to connect in a single
            platform.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
