
import { ArrowBack, Home, Person } from "@material-ui/icons";
export const getCategories = history => {
    return [
        [{
            key: 'back',
            icon: <ArrowBack style={{color: "#424242"}}/>,
            tooltip: 'Back',
            action: () => history.push('/race')
        }],
        [{
            key: 'home',
            icon: <Home style={{color: "#424242"}}/>,
            tooltip: 'Race Information',
            action: () => console.log('Race Info')
        },
        {
            key: 'pilot',
            icon: <Person style={{color: "#424242"}}/>,
            tooltip: 'Pilots',
            action: () => console.log('Pilots')
        }]
    ]
}