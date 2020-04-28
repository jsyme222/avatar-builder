import React from 'react';
import { 
    makeStyles, 
    Paper, 
    Container, 
} from '@material-ui/core';
import BuilderMenu from '../menu/menu-components/menu';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        avatar: state.avatar,
    }
}

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
                    <img src={props.avatar.base} alt={"avatar"} />
                </BuilderMenu>
            </Paper>
        </Container>
    )
}

export default connect(mapStateToProps)(AvatarBuilder);