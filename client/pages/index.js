import {Context} from '../context';
import {useContext} from 'react';


const Home = () =>  {
const {state} = useContext(Context);
    
    
        return (
            <div className="container">
                <h2 className="text-center pt-4 display-4">Home Page</h2>
                <p className="lead">This page is for public view. Anyone can access it, if you login you can see your details here.</p>
            
                <pre>{JSON.stringify(state, null, 4)}</pre>

            </div>

        );
};

export default Home