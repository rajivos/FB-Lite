import React, { useState } from "react";
import MemberContext from "./MemberContext";

const MemberProvider = props => {
  const [state, setState] = useState({
    email: "",
    visibility: "",
    objectId: "",
    authenticated:false,
    screenName:"",
    password:null,
    uid:""
  });

  return (
    <MemberContext.Provider
      value={{
        data: state,
        updateAll: (res) => {
          const { visibility, email, objectId } = res;
          setState({...state, 
                  visibility: visibility,
                  email: email,
                  objectId: objectId,
          });
        },
        updateVisibility: (chosenVisitibility) => {
          setState({ ...state, visibility: chosenVisitibility });
        },
        updateAuthenticated:  () => {
          setState({...state, authenticated:!state.authenticated })
        },
        updateEmail:  (email) => {
          setState({...state, email:email })
        },
        updatePassword: (password) => {
          setState({...state, password:password })
        },
        updateVisibility:  (visibility) => {
          setState({...state, visibility:visibility })
        },
        updateScreenName: (screenName) =>{
          setState({...state, screenName:screenName })
        },
        updateObjectId: (objectId) =>{
          setState({...state, objectId:objectId })
        },
        updateUid: (uid) =>{
          setState({...state, uid:uid })
        },
        updateMemberObject : (membObject) =>{
          setState({...state, memberObject: membObject

          })
        }
      }}
    >
      {props.children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;


/*

import MemberContext from './MemberContext';

class MemberProvider extends Component {
    render() {
        
    }

    render() {
        return (
            <MemberContext.Provider
                value={{
                    cars: this.state.cars,
                    incrementPrice: selectedID => {
                        const cars = Object.assign({}, this.state.cars);
                        cars[selectedID].price = cars[selectedID].price + 1;
                        this.setState({
                            cars
                        });
                    },
                    decrementPrice: selectedID => {
                        const cars = Object.assign({}, this.state.cars);
                        cars[selectedID].price = cars[selectedID].price - 1;
                        this.setState({
                            cars
                        });
                    }
                }}
            >
                {this.props.children}
            </MemberContext.Provider>
        );
    }
}

export default MemberProvider;
*/