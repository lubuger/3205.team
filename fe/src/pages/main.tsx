import React, { useState } from "react";
import {
    fetchAsync, selectStatus, selectUsers, setLoading
} from "../features/fetch/fetchSlice";
import {
    useAppDispatch, useAppSelector 
} from "../app/hooks";
import Loader from "../components/Loader";


let abortController: any;

const Main = () => {
    const [emailValid, setEmailValid] = useState(false);
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const users = useAppSelector(selectUsers);
    const fetchData = () => {
        if (abortController) {
            abortController.abort(); // Tell the browser to abort request
            setTimeout(() => {
                dispatch(setLoading());
            }, 10)
        }

        abortController = typeof 'AbortController' !== 'undefined' && new AbortController();

        dispatch(fetchAsync({
            email,
            number: number.trim() === ''
                ? undefined
                : Number(number.replaceAll('-', '')),
            signal: abortController.signal,
        }))
    }

    const onChangeNumber = (number: string) => {
        let formattedNumber = '';
        number = number.replaceAll('-', '');

        if (Number(number) || number.trim() === '') {
            for (let i= 0; i<number.length; i++) {
                if (i % 2 === 0 && i !== 0) {
                    formattedNumber += `-${number[i]}`;
                } else {
                    formattedNumber += number[i];
                }
            }

            setNumber(formattedNumber);
        }
    };

    const onChangeEmail = (email: string) => {
        const isValid = email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

        if (isValid || email.trim() === '') {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }

        setEmail(email);
    };

    return (
        <>
            <div className="row mt-5">
                <div className="col d-flex justify-content-center">
                    <form className="g-3 w-50">
                        { status !== 'loading' ? (
                            <>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                    <input type="email"
                                        className={`form-control is-${emailValid ? 'valid' : 'invalid'}`}
                                        id="email"
                                        placeholder="name@example.com"
                                        onChange={e => onChangeEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Number</label>
                                    <input type="text"
                                        className="form-control"
                                        id="number"
                                        placeholder="123456"
                                        value={number}
                                        onChange={e => onChangeNumber(e.target.value)}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="m-5">
                                <Loader />
                            </div>
                        )}

                        <button
                            type="button"
                            className="btn btn-lg btn-primary"
                            onClick={() => fetchData()}
                            disabled={!emailValid}
                        >Check</button>
                    </form>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col d-flex justify-content-center">
                    {users.length > 0 && (
                        <div className="w-50">
                            Found users:

                            {JSON.stringify(users)}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
};

export default Main;