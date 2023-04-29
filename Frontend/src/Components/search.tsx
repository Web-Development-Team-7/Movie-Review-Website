import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Navbar from "./navbar";

export default function SearchResults() {

    useEffect(() => {
        const fetchData = async () => {
            const currentURL = window.location.href;
            console.log(currentURL);
            const result = currentURL.slice(31);
            console.log(result)
            var url = 'http://localhost:5678/search/'+result;
            let res=await axios.get(url)
            //var filteredRes = res.data.results.filter(function (movie) { return movie.original_language === 'en' })
            console.log(res.data.results.filter(function (movie) { return movie.original_language === 'en' }))

        };
        fetchData();
    }, []);

    return(
        <React.Fragment>
            <Navbar/>
            
        </React.Fragment>
    )
}