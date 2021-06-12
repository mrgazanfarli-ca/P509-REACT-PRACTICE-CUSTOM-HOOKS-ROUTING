import React from 'react';
import { useHistory } from 'react-router-dom';

import { useCopyToClipboard, useMobileDeviceDetector } from "../hooks";
import { COPY_ALERT_TIMEOUT } from "../consts";
import sweetAlert from "../utils/swal";

import InputWrapper from "../components/InputWrapper";
import EmailInput from "../components/EmailInput";
import InputLabel from "../components/InputLabel";
import Button from "../components/Button";

const HomePage = () => {
    const [emailValue, setEmailValue] = React.useState('');
    const [validationError, setValidationError] = React.useState();
    const [copyToClipboard, isCopiedToClipboard] = useCopyToClipboard(COPY_ALERT_TIMEOUT);
    const isMobileDevice = useMobileDeviceDetector();
    const history = useHistory();
    // const randomColor = useRandomColor(2500);
    //
    // React.useEffect(() => {
    //     document.getElementById('header').style.backgroundColor = randomColor;
    // }, [randomColor]);

    React.useEffect(() => {
        if (isCopiedToClipboard) {
            sweetAlert.fire({
                title: 'Email successfully copied',
                icon: 'success',
                toast: true,
                timer: COPY_ALERT_TIMEOUT,
                position: 'top-right',
                showConfirmButton: false,
            }).then(() => {
                history.push('/about', { name: 'Gazanfar' });
            });
        }
    } ,[isCopiedToClipboard, history]);

    React.useEffect(() => {
        console.log(isMobileDevice);
        if (isMobileDevice) {
            sweetAlert.fire({
                title: 'Mobile device detected',
                icon: 'success',
                toast: true,
                timer: 10000,
                position: 'top-right',
                showConfirmButton: false,
            });
        }
    }, [isMobileDevice]);

    const handleEmailChangeBetter = React.useCallback((e) => {
        const { value } = e.target;

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        setEmailValue(value);

        if (Boolean(value)) {
            if (emailRegex.test(value)) {
                setValidationError('');
            } else {
                setValidationError('Email is not valid');
            }
        } else {
            setValidationError('Email is required');
        }

    }, []);

    // const emailModified = React.useMemo(() => emailValue + ' test2', [emailValue]);
    // console.log(emailModified);

    const handleCopyClick = React.useCallback(() => {
        copyToClipboard(emailValue);
    }, [copyToClipboard, emailValue]);

    //
    // const handleEmailChange = (e) => {
    //     console.log('Test value is: ',test);
    //     const { value } = e.target;
    //
    //     const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //
    //     setEmailValue(value);
    //
    //     if (Boolean(value)) {
    //         if (emailRegex.test(value)) {
    //             setValidationError('');
    //         } else {
    //             setValidationError('Email is not valid');
    //         }
    //     } else {
    //         setValidationError('Email is required');
    //     }
    //
    // }

    const buttonText = React.useMemo(() => isCopiedToClipboard ? 'Copied' : 'Copy', [isCopiedToClipboard]);
    const isButtonDisabled = React.useMemo(() => {
        return Boolean(validationError) || isCopiedToClipboard || !Boolean(emailValue);
    }, [emailValue, isCopiedToClipboard, validationError]);

    return (
        <div className="mini-container">
            <InputWrapper>
                <EmailInput value={emailValue} onChange={handleEmailChangeBetter} />
                <InputLabel>Email address</InputLabel>
            </InputWrapper>
            {Boolean(validationError) && <span className="error-text">{validationError}</span>}
            <Button onClick={handleCopyClick} disabled={isButtonDisabled}>
                {buttonText}
            </Button>
        </div>
    )
}

export default HomePage;
