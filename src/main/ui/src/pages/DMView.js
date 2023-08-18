import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function DMView() {

    const file = useSelector(
        (state) => alert(state.fileState.file)
    )

    return (
        <h1>BRUH</h1>   
    );
}

export default DMView;
