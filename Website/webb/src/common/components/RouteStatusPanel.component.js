import Alert from '@mui/material/Alert';

const RouteStatusPanel = ({displayPanel, foundRoute, startingBuilding, destinationBuilding}) => {

    // don't display route status panel (e.g. will be false at start)
    if(!displayPanel){
       return <></>
    }

    if(foundRoute){
        return <Alert severity="success">Found a route that started at {startingBuilding.name} and ended at {destinationBuilding.name}</Alert>
    }else{
        return <Alert severity="warning">No Route was found that started at {startingBuilding.name} and ended at {destinationBuilding.name}</Alert>
    
    }
}

export default RouteStatusPanel;