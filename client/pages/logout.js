import {Context} from '../context';
import {useContext} from 'react';


const Logout = () =>  {
    const {state} = useContext(Context);
        return (
            <div>
                <h2>You have logged out</h2>
            </div>
        );
};

export default Logout