import React from "react";
import { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'

export function getAddress(){ // import this to get the address latitdue and longitude info out 
    return {
        address: exportAddress,
        latitude: lat,
        longitude: long
    }
}

//variables to be exported out
let exportAddress
let lat
let long
export default function AddressPicker(){
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        libraries:["places"]
    })

    const inputref = useRef(null);
    function handleOnPlacesChanged(){
        const address = inputref.current.getPlaces();
        console.log(address[0].geometry.location.lat());
        lat = address[0].geometry.location.lat();
        long = address[0].geometry.location.lng();
        exportAddress = address[0].formatted_address;
    }


    return(
        <div>
        <style jsx>{`
            .address-input{
                width: 100%;
                padding: 2px 4px;
                border-radius: 4px;
            }
        `}</style>
        {isLoaded &&
        <StandaloneSearchBox
            onLoad={(ref) => inputref.current = ref}
            onPlacesChanged={handleOnPlacesChanged}
        >
            <input type="text" placeholder="Search place" className="address-input" required/>
        </StandaloneSearchBox>}
        </div>)


}