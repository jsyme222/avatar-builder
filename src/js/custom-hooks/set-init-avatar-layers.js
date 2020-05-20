import { useState, useEffect }from 'react';
import { APIHandler } from '../conf';
import { connect } from 'react-redux'; 
import { 
  setAvatar, 
  setLayers, 
  setBase,
  setFace,
  setGender,
  setHair,
  setTops,
  setBottoms,
  setAccessories,
} from '../redux/actions/index';

const mapStateToProps = state => {
    return {
        avatar: state.avatar
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setGender: gender => dispatch(setGender(gender)),
        setAvatar: avatar => dispatch(setAvatar(avatar)),
        setLayers: layers => dispatch(setLayers(layers)),
        setBase: base => dispatch(setBase(base)),
        setFace: face => dispatch(setFace(face)),
        setHair: hair => dispatch(setHair(hair)),
        setTops: tops => dispatch(setTops(tops)),
        setBottoms: bottoms => dispatch(setBottoms(bottoms)),
        setAcc: acc => dispatch(setAccessories(acc)),
    }
};

function SetInitAvatarLayers(props) {
    // eslint-disable-next-line
    const [avatar, setAvatar] = useState(null);
    const options = {
      face: props.setFace,
      avatar: props.setAvatar,
      gender: props.setGender,
      base: props.setBase,
      hair: props.setHair,
      tops: props.setTops,
      bottoms: props.setBottoms,
      acc: props.setAccessories,
    }

    useEffect(() => {
          APIHandler([`getAvatar`, 'jdogg'])
          .then((data) => {
            console.log(data);
            options.avatar(
              {
                username: data.title ? data.title : "",
                gender: data.gender && data.gender.title ? data.gender.title : "",
                outfitName: data.outfit_name ? data.outfit_name : "",
              }
            );
            options.base(data.base ? data.base : []);
            options.hair(data.hair ? data.hair : [], );
            options.tops(data.tops ? data.tops : []);
            options.bottoms(data.bottoms ? data.bottoms : []);
            options.face(data.face ? data.face : []);
          });
      }, []);

    return avatar;
}

export default connect(mapStateToProps, mapDispatchToProps)(SetInitAvatarLayers);