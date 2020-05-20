import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        details: state.itemDetails
    }
};

function GradientList(props) {
    const [item, setItem] = useState(null);
    const [gradients, setGradients] = useState(null);
    const [activeGradient, setActiveGradient] = useState(null);
    const useStyles = makeStyles((theme) => ({
        root: {
            minHeight: 50,
        },
        gradientBox: {
            height: 25,
            width: 25,
            margin: 2.5,
            '&:hover': {
                cursor: 'pointer',
            }
        },
        listContainer: {
            display: 'flex',
        },
        activeGradient: {
            transition: 'all 0.35s ease',
            boxShadow: `2px 2px 1px -1px ${theme.palette.secondary.main},0px 1px 1px 0px ${theme.palette.secondary.main},0px 1px 3px 2px ${theme.palette.primary.main}`,
        }
    }));
    const classes = useStyles();

    useEffect(() => {
        if(props.item) {
            setItem(props.item);
        }
    }, [props.item, ]);

    useEffect(() => {
        setGradients(props.details.gradients)
    }, [props.details, ]);

    return (
        <Container className={classes.root}>
            <p>Gradient</p>
                {Array.isArray(gradients) ?
                    gradients.map((g) => 
                        <div 
                            style={{ background: g }} 
                            className={`${classes.gradientBox} ${(g === activeGradient) && classes.activeGradient}`}
                            onClick={(event) => setActiveGradient(g)}
                        ></div>
                    )    
                    :
                    null
                }
        </Container>
    )
}

export default connect(mapStateToProps)(GradientList);