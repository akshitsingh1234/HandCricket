//modalContext.js

import React from "react";
const modalContext = React.createContext({num_played:0,num_won:0,num_lost:0,num_drawn:0,percent_won:0.0});

export default modalContext;