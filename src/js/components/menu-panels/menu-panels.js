import React, { useEffect } from 'react';
import {
    Box,
} from '@material-ui/core';
import OverviewTab from './panel-components/overview';
import ClosetTab from './panel-components/closet';
import { BaseTabButtons } from '../menu-panels/panel-components/button-cards';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubcategoryPanel from './subcategory-panel';
import SetEquipped from '../../custom-hooks/set-equipped';
import {
    setBase,
    setFace,
    setHair,
    setTops,
    setHats,
    setBottoms,
    setFeet,
    setDetails,
    setEquipped,
    setAccessories,
} from '../../redux/actions/index';

const mapStateToProps = state => {
    return {
        openPanel: state.openPanel.id,
        face: state.layers.face,
        allHair: [...state.layers.hair, ...state.layers.facialHair],
        base: state.layers.base,
        tops: state.layers.tops,
        hats: state.layers.hats,
        bottoms: state.layers.bottoms,
        feet: state.layers.feet,
        details: state.itemDetails,
        accessories: state.layers.accessories,
        equipped: state.equipped,
        layers: state.layers,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setBase: base => dispatch(setBase(base)),
        setFace: face => dispatch(setFace(face)),
        setHair: hair => dispatch(setHair(hair)),
        setTops: tops => dispatch(setTops(tops)),
        setHats: hats => dispatch(setHats(hats)),
        setBottoms: bottoms => dispatch(setBottoms(bottoms)),
        setFeet: feet => dispatch(setFeet(feet)),
        setDetails: details => dispatch(setDetails(details)),
        setEquipped: equipped => dispatch(setEquipped(equipped)),
        setAccessories: acc => dispatch(setAccessories(acc)),
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
    const setter = props.setEquipped;
    const equippedFace = SetEquipped(props.face);
    const equippedHair = SetEquipped(props.allHair);
    const equippedTops = SetEquipped(props.tops);
    const equippedHats = SetEquipped(props.hats);
    const equippedBottoms = SetEquipped(props.bottoms);
    const equippedFeet = SetEquipped(props.feet);
    const equippedAccessories = SetEquipped(props.accessories);
    const equippedBase = SetEquipped(props.base);
    const SUBCATEGORIES = {  // Subcategories are plural as they were recieved within an array of like objs
        'HATS': props.setHats,
        'BASE': [
            props.base,
            equippedBase,
            props.setBase
        ],
        'HAIR': [
            props.allHair,
            equippedHair,
            props.setHair
        ],
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
        'ACCESSORIES': [
            props.accessories,
            equippedAccessories,
            props.setAccessories,
        ],
    };

    const ALL_CATS = () => {
        let data = {
            idArray: [],
            equipped: []
        };
        let allCats = [
            equippedHats,
        ];
        allCats.map((cat) => {
            data.idArray.push(...cat.idArray);
            data.equipped.push(...cat.equipped);
            return true;
        })
        return data;
    };

    const setItemDetails = (item) => {
        props.setDetails(item)
    };

    const itemsToLayers = (itemsArray) => {
        let list = [];
        itemsArray.map((i) => {
            if((typeof(i) === 'object') && (i !== null)){
                i.equipped && Object.entries(i.equipped).map((item) => {
                    if(item[1] && item[1].image){
                        for(let t = 1; t < 6; t++){
                            if(item[1].image[`layer${t}`]){
                                list.push(item[1].image[`layer${t}`])
                            }
                        }
                    }
                    return true
                })
            }
            return true
        })
        return list
    }

    const handleClickArray = (obj) => {
        console.log(obj)
        let field = SUBCATEGORIES[obj.category.toUpperCase()];
        let props = field[0];
        let equipped = field[1];
        let data;
        if(equipped.idArray.includes(obj.id)){
            data = props.filter((item) => item.id !== obj.id)
        }else{
            if(obj.can_layer){
                data = [...props, obj];
                setItemDetails(obj)
            }else{
                let lose_double = props.filter((item) => (item.subcategory || item.category) !== (obj.subcategory || obj.category));
                data = [...lose_double, obj];
                setItemDetails(obj)
            }
        }
        setter(itemsToLayers([{'equipped': data}, ]));
        field[2](data);
    };

    const handleClickSingleItem = (obj) => {
        let equipped = ALL_CATS();
        let field = obj.subcategory || obj.category;
        let data;
        if(equipped.idArray.includes(obj.id)){
            data = []
        }else{
            data = [obj, ];
            setItemDetails(obj)
        }
        SUBCATEGORIES[field](data);
    };

    useEffect(() => {
        if(
            equippedAccessories &&
            equippedBottoms && 
            equippedFace &&
            equippedFeet &&
            equippedHair &&
            equippedHats &&
            equippedTops &&
            !props.equipped.length
        ){
            let allEquippedItems = [
                equippedHats,
                equippedHair,
                equippedFace,
                equippedTops,
                equippedBottoms,
                equippedFeet,
                equippedAccessories,
            ];
            let list = itemsToLayers(allEquippedItems);
            setter(list)
        }
    }, [
        equippedHats,
        equippedHair,
        equippedFace,
        equippedTops,
        equippedBottoms,
        equippedFeet,
        equippedAccessories,
        setter,
        props.equipped
    ])

    return (
        <>
        {/* {console.log(props.equipped)} */}
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
                <SubcategoryPanel
                    equipped={equippedBase}
                    onClickAction={handleClickArray}
                >
                    <BaseTabButtons />
                </SubcategoryPanel>
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
                    onClickAction={handleClickArray}
                />
            </TabPanel>
            <TabPanel value={props.openPanel} index={5}>
                {/* Hats Panel */}
                <SubcategoryPanel
                    equipped={equippedHats}
                    onClickAction={handleClickArray}
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
            <TabPanel value={props.openPanel} index={8}>
                {/* Feet Panel  */}
                <SubcategoryPanel
                    equipped={equippedFeet}
                    onClickAction={handleClickArray}
                />
            </TabPanel>
            <TabPanel value={props.openPanel} index={9}>
                {/* Accessories Panel  */}
                <SubcategoryPanel
                    equipped={equippedFeet}
                    onClickAction={handleClickArray}
                />
            </TabPanel>
            <TabPanel value={props.openPanel} index={10}>
                {/* Premium Panel  */}
                <SubcategoryPanel
                    equipped={equippedFeet}
                    onClickAction={handleClickArray}
                />
            </TabPanel>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPanels);