import { useHistory } from "react-router-dom";

const AboutPage = () => {
    const history = useHistory();

    console.log(history.location.state);

    return (
        <div>
            <p style={{ color: 'black' }}>this is about page</p>
        </div>
    )
}

export default AboutPage;
