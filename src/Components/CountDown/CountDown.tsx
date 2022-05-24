import React, { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import './CountDown.scss';
import Modal from '../Modal/Modal'
import FBIcon from "../../Assets/img/facebook.svg"
import twitterIcon from "../../Assets/img/twitter.svg"
import { BsLink45Deg } from "react-icons/bs"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FacebookShareButton, TwitterShareButton } from "react-share";

interface TimeDisplayValuesType {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountDown = () => {
    const [show, setShow] = useState(false)
    const [copySuccess, setCopySuccess] = useState<any>({
        value: "",
        copied: false
    });

    const handleClose = () => {
        setShow(false)
    }

    React.useEffect(() => {
        setTimeout(() => {
            if (copySuccess.copied === true) {
                setCopySuccess({ copied: false })
            }
        }, 3000);
    }, [copySuccess])


    // Current Date
    const date = new Date()
    let yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1;
    let dd: any = date.getDate();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let todaysDate = `${mm}.${dd}.${yyyy}`
    console.log(todaysDate)

    // Timing 
    const nextYear = new Date().getFullYear() + 1;
    const targetDate = new Date(`Jan 1, ${nextYear} 00:00:00`).getTime();

    const generateTimeDisplay = (): TimeDisplayValuesType => {
        const rightJustNow = new Date().getTime();
        const runway = targetDate - rightJustNow;
        const stateObj = {
            days: Math.floor(runway / (1000 * 60 * 60 * 24)),
            hours: Math.floor((runway % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((runway % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((runway % (1000 * 60)) / 1000)
        };
        return stateObj;
    };

    const [timeDisplay, setTimeDisplay] = React.useState<TimeDisplayValuesType>(
        generateTimeDisplay
    );

    React.useEffect(() => {
        setInterval(() => setTimeDisplay(generateTimeDisplay), 1000);
    }, []);

    return (
        <div className="main_container">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className='moon_landing_container'>
                            <h3>MOON LANDING PARTY</h3>
                            <h1>{todaysDate}</h1>
                            <span className="anniversary_starts">Anniversary starts in</span>
                            <Row className="mt-3 justify-content-center align-items-center">
                                <Col md={2} className="d-flex justify-content-center">
                                    <div className="counter_container">
                                        <p className="mb-0">{timeDisplay.days}</p>
                                        <span>Days</span>
                                    </div>
                                </Col>
                                <Col md={1} className="colon_container">
                                    <span>:</span>
                                </Col>

                                <Col md={2} className="d-flex justify-content-center">
                                    <div className="counter_container">
                                        <p className="mb-0">{timeDisplay.hours}</p>
                                        <span>Hours</span>
                                    </div>
                                </Col>
                                <Col md={1} className="colon_container">
                                    <span>:</span>
                                </Col>

                                <Col md={2} className="d-flex justify-content-center">
                                    <div className="counter_container">
                                        <p className="mb-0">{timeDisplay.minutes}</p>
                                        <span>Minutes</span>
                                    </div>
                                </Col>
                                <Col md={1} className="colon_container">
                                    <span>:</span>
                                </Col>

                                <Col md={2} className="d-flex justify-content-center">
                                    <div className="counter_container">
                                        <p className="mb-0">{timeDisplay.seconds}</p>
                                        <span>Seconds</span>
                                    </div>
                                </Col>
                                <Col md={1}>
                                </Col>

                            </Row>
                            <div className='text-center mt-3'>
                                <button onClick={() => setShow(true)}>Share Event</button>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Modal */}

                <Modal show={show} size={"undefined"} handleClose={handleClose}>
                    <div className="modal_data">
                        <p>Share this event with your social community</p>
                        <div className="icons_container">

                            <div className="twitter_container">
                                <TwitterShareButton title={"Who else is going to the moon party?"} url={"https://moonparty.com"}>
                                    <img src={twitterIcon} />
                                </TwitterShareButton>
                            </div>


                            <div className="fb_container">
                                <FacebookShareButton
                                    url={"https://moonparty.com"}
                                    quote={"Who else is going to the moon party?"}
                                >
                                    <img src={FBIcon} />
                                </FacebookShareButton>

                            </div>

                        </div>
                        <span>or copy link</span>

                        <div className="clipboard_container">
                            <div className="d-flex">
                                <span className='m-0'><BsLink45Deg /></span>
                                <p> https://moonparty.com</p>
                            </div>
                            <div>
                                <CopyToClipboard text={'https://moonparty.com'}
                                    onCopy={() => setCopySuccess({ copied: true })}>
                                    <button>
                                        {copySuccess.copied ? "Link Copied!" :
                                            "Copy"
                                        }
                                    </button>
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                </Modal>
            </Container>
        </div>
    )
}

export default CountDown