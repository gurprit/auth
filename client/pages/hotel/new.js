import {parseCookies} from 'nookies';
import axios from 'axios';

const NewBooking = () => {
    return (
        <div className="container">
            <h2>Post a new Hotel for booking</h2>
            <p className="lead">This is a protected page for logged in users only</p>
        </div>
    );
};


export async function getServerSideProps(context) {
    try {
        const cookies = parseCookies(context);
        //console.log('NOOKIES SENDING TOKEN', cookies);
        const { data } = await axios.get(`${process.env.api}/private-route`, {
            headers: {
                token: cookies.token, 
            },
        });
        if (data.ok) return {props: {}}        
    } catch (err) {
        return {
            redirect: {
                permanent: false, 
                destination: '/login'
            },
            props: {},
        };
        
    }

}


export default NewBooking;



