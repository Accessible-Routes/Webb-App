import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';


const BuildingAccessibilityAlert = ({ startingBuilding, destinationBuilding }) => {
    return (<Container>
        {startingBuilding?.accessible ? <></> :
            <Alert variant="outlined" severity="warning">{startingBuilding.name} is not accessible</Alert>
        }

        {destinationBuilding?.accessible ? <></> :
            <Alert variant="outlined" severity="warning">{destinationBuilding.name} is not accessible</Alert>
        }

    </Container>);

}

const RouteStatusPanel = ({ displayPanel, foundRoute, startingBuilding, destinationBuilding }) => {
    // A component to display if a route is accessible and the accessibility status of a building

    // don't display route status panel (e.g. will be false at start)
    if (!displayPanel || startingBuilding === undefined || destinationBuilding === undefined) {
        return <></>
    }

    if (foundRoute) {
        return (<Container>
            <Alert severity="success">Found a route that started at {startingBuilding.name} and ended at {destinationBuilding.name}</Alert>
            <BuildingAccessibilityAlert startingBuilding={startingBuilding} destinationBuilding={destinationBuilding} />
        </Container>)
    } else {
        return (<Container>
            <Alert severity="warning">No Route was found that started at {startingBuilding.name} and ended at {destinationBuilding.name}</Alert>
            <BuildingAccessibilityAlert startingBuilding={startingBuilding} destinationBuilding={destinationBuilding} />
        </Container>)
    }
}

export default RouteStatusPanel;