import React from 'react';
import {
    Box,
} from '@material-ui/core';
import OverviewTab from './overview';
import ClosetTab from './closet';
import BaseTab from './base';
import AccessoriesTab from './accessories';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubcategoryPanel from './subcategory-panel';
import SetEquipped from '../../custom-hooks/set-equipped';
import {
    setFace,
    setEyebrows,
    setHair,
    setFacialhair,
    setTops,
    setHats,
    setBottoms,
} from '../../redux/actions/index';

const mapStateToProps = state => {
    // console.log(state.layers.tops)
    return {
        openPanel: state.openPanel.id,
        face: state.layers.face,
        hair: state.layers.hair,
        facialHair: state.layers.facialHair,
        allHair: [...state.layers.hair, ...state.layers.facialHair],
        tops: state.layers.tops,
        hats: state.layers.hats,
        bottoms: state.layers.bottoms,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setFace: face => dispatch(setFace(face)),
        setEyebrows: eyebrows => dispatch(setEyebrows(eyebrows)),
        setHair: hair => dispatch(setHair(hair)),
        setFacialhair: facialHair => dispatch(setFacialhair(facialHair)),
        setTops: tops => dispatch(setTops(tops)),
        setHats: hats => dispatch(setHats(hats)),
        setBottoms: bottoms => dispatch(setBottoms(bottoms)),
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role={'tabpanel'}
            hidden={value !== index}
            id={`builder-tabpanel-${index}`}
            aria-labelledby={`builder-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function MenuPanels(props) {
    const equippedFace = SetEquipped(props.face);
    const equippedHair = SetEquipped(props.allHair);
    const equippedTops = SetEquipped(props.tops);
    const equippedHats = SetEquipped(props.hats);
    const equippedBottoms = SetEquipped(props.bottoms);
    const SUBCATEGORIES = {  // Subcategories are plural as they were recieved within an array of like objs
        'MOUTHS': props.setMouth,
        'HEAD-HAIR': props.setHair,
        'FACIAL-HAIR': props.setFacialhair,
        'HATS': props.setHats,
        'BOTTOMS': [
            props.bottoms,
            equippedBottoms,
            props.setBottoms
        ],
        'TOPS': [
            props.tops,
            equippedTops,
            props.setTops,
        ],
        'FACE': [
            props.face,
            equippedFace,
            props.setFace,
        ],
    };

    const ALL_CATS = () => {
        let data = {
            idArray: [],
            equipped: []
        };
        let allCats = [
            equippedHair,
            equippedHats,
        ];
        allCats.map((cat) => {
            data.idArray.push(...cat.idArray);
            data.equipped.push(...cat.equipped);
            return true;
        })
        return data;
    };

    const handleClickArray = (obj) => {
        let field = SUBCATEGORIES[obj.category];
        let props = field[0];
        let equipped = field[1];
        let data;
        if(equipped.idArray.includes(obj.id)){
            data = props.filter((item) => item.id !== obj.id)
        }else{
            data = [...props, obj];
        }
        field[2](data);
    };

    const handleClickSingleItem = (obj) => {
        let equipped = ALL_CATS();
        let field = obj.subcategory || obj.category;
        let data;
        if(equipped.idArray.includes(obj.id)){
            data = []
        }else{
            data = [obj, ]
        }
        SUBCATEGORIES[field](data)
    };

    return (
        <>
            <TabPanel value={props.openPanel} index={0}>
                {/* Overview Panel */}
                <OverviewTab />
            </TabPanel>
            <TabPanel value={props.openPanel} index={1}>
                {/* Closet Panel */}
                <ClosetTab />
            </TabPanel>
            <TabPanel value={props.openPanel} index={2}>
                {/* Base Panel */}
                <BaseTab />
            </TabPanel>
            <TabPanel value={props.openPanel} index={3}>
                {/* Face Panel */}
                <SubcategoryPanel
                    equipped={equippedFace}
                    onClickAction={handleClickArray}
                />
            </TabPanel>
            <TabPanel value={props.openPanel} index={4}>
                {/* Hair Panel */}
                <SubcategoryPanel
                    equipped={equippedHair}
                    onClickAction={handleClickSingleItem}
                />
            </TabPanel>
            <TabPanel value={props.openPanel} index={5}>
                {/* Hats Panel */}
                <SubcategoryPanel
                    equipped={equippedHats}
                    onClickAction={handleClickSingleItem}
                />
            </TabPanel>
            <TabPanel value={props.openPanel} index={6}>
                {/* Tops Panel */}
                <SubcategoryPanel
                    equipped={equippedTops}
                    onClickAction={handleClickArray}
                />
            </TabPanel>
            <TabPanel value={props.openPanel} index={7}>
                {/* Bottoms Panel  */}
                <SubcategoryPanel
                    equipped={equippedBottoms}
                    onClickAction={handleClickArray}
                />
            </TabPanel>
            <TabPanel value={props.openPanel} index={9}>
                <AccessoriesTab />
            </TabPanel>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPanels);