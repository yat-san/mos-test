import {Header} from "./js/modules/Header/Header";
import {Footer} from "./js/modules/Footer/Footer";
import {Appointment} from "./js/modules/Appointment/Appointment";

function App () {

    return (
        <>
            <Header/>
            <main>
                <div className="wrapper">
                    <Appointment/>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default App;
