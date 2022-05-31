import React, { Component } from 'react';
import DaumPostcode from 'react-daum-postcode';

class Postcode extends Component {


    onCompletePost=(data)=>{
        console.log( data );
        console.log( data.zonecode );
        console.log( data.address );
        console.log( data.roadAddress );
        console.log( data.roadAddressEnglish );
        console.log( data.jibunAddress );
        console.log( data.jibunAddressEnglish );
        //초기화
        this.props.postcodeEvent(false);
        this.props.postcodeAddress(data.zonecode, data.roadAddress);
    }

    render() {

        const poststyle = {
            position:'fixed',
            top:'50%',
            left:'50%',
            marginTop:'-250px',
            marginLeft:'-200px',
            width:'400px',
            height:'500px',
            background:'#fff',
            border:'1px solid #444',
            zIndex:2
        }

        return (
            <div>
                <DaumPostcode 
                style={poststyle}
                autoClose
                onComplete={this.onCompletePost} 
                />
            </div>
        );
    }
}

export default Postcode;