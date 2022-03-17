import {Header} from "./js/modules/Header/Header";
import {Footer} from "./js/modules/Footer/Footer";
import {Appointment} from "./js/modules/Appointment/Appointment";

function App () {

    return (
        <>
            <a href="#main" className={"skipLink"}>Перейти к основному контенту</a>
            <Header/>
            <main id={"main"}>
                <div className="wrapper">
                    <Appointment/>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default App;
