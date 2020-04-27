import React from 'react';
import { 
    makeStyles, 
    Paper, 
    Container 
} from '@material-ui/core';


function AvatarBuilder(props) {
    const useStyles = makeStyles((theme) => ({
        root: {

        }
    }));
    const classes = useStyles();

    return (
        <Container maxWidth={"lg"} className={classes.root}>
            <Paper>
                <h1>Builder</h1>
            </Paper>
        </Container>
    )
}

export default AvatarBuilder;