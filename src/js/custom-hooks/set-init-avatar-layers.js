import { useState, useEffect }from 'react';
import { APIHandler } from '../conf';
import { connect } from 'react-redux'; 
import { 
  setAvatar, 
  setLayers, 
  setBase,
  setFace,
  setGender,
  setEyes,
  setHair,
  setFacialhair,
  setTops,
  setBottoms,
  setMouth,
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
        setEyes: eyes => dispatch(setEyes(eyes)),
        setHair: hair => dispatch(setHair(hair)),
        setFacialhair: facialHair => dispatch(setFacialhair(facialHair)),
        setTops: tops => dispatch(setTops(tops)),
        setBottoms: bottoms => dispatch(setBottoms(bottoms)),
        setMouth: mouth => dispatch(setMouth(mouth)),
        setAcc: acc => dispatch(setAccessories(acc)),
    }
};

function SetInitAvatarLayers(props) {
    // eslint-disable-next-line
    const [avatar, setAvatar] = useState(null);
    const options = {
      avatar: props.setAvatar,
      gender: props.setGender,
      base: props.setBase,
      eyes: props.setEyes,
      hair: props.setHair,
      facialHair: props.setFacialhair,
      tops: props.setTops,
      bottoms: props.setBottoms,
      mouth: props.setMouth,
      acc: props.setAccessories,
    }
    
    useEffect(() => {
          APIHandler([`getAvatar`, 'jdogg'])
          .then((data) => {
            console.log(data);
            options.avatar(
              {
                username: data.title ? data.title : "",
                gender: data.gender.title ? data.gender.title : "",
                outfitName: data.outfit_name ? data.outfit_name : "",
              }
            );
            // options.gender(data.gender.title ? data.gender.title : "");
            options.base(data.base ? data.base : []);
            options.eyes(data.face.eyes ? data.face.eyes : []);
            options.hair([data.hair['head-hair'] ? data.hair['head-hair'] : [], ]);
            options.facialHair([data.hair['facial-hair'] ? data.hair['facial-hair'] : [], ]);
            options.tops(data.tops ? data.tops : []);
            options.bottoms(data.bottoms ? data.bottoms : []);
            options.mouth(data.face.mouths ? data.face.mouths : []);
          });
      }, []);

    return avatar;
}

export default connect(mapStateToProps, mapDispatchToProps)(SetInitAvatarLayers);