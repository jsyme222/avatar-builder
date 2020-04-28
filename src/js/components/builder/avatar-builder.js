import React from 'react';
import { 
    makeStyles, 
    Paper, 
    Container, 
} from '@material-ui/core';
import BuilderMenu from '../menu/menu-components/menu';


function AvatarBuilder(props) {
    const useStyles = makeStyles((theme) => ({
        root: {

        }
    }));
    
    const classes = useStyles();

    return (
        <Container maxWidth={"lg"} className={classes.root}>
            <Paper>
                <BuilderMenu>
                    <h1>Builder</h1>
                </BuilderMenu>
            </Paper>
        </Container>
    )
}

export default AvatarBuilder;