import React, { useCallback } from 'react';
import Button from '../ui/Button';
import styles from "./styles.module.scss";


interface INavegacao {
    index: number;
    max: number;
    Action: (index: number) => void
}

export default (props: INavegacao) => {

    const handleGetPrevious = useCallback(async () => {
        if (props.max == 0) {
            return;
        }
        const count = props.index - 1 < 0 ? props.index : props.index - 1;
        props.Action(count);
    }, [props])


    const handleGetNext = useCallback(async () => {
        if (props.max == 0) {
            return;
        }
        const count = props.index + 1 < props.max ? props.index + 1 : props.index;

        props.Action(count);

    }, [props])

    const handleGetFirst = useCallback(async () => {
        console.log(props)
        if (props.max == 0) {
            return;
        }
        props.Action(0);
    }, [props])

    const handleGetLast = useCallback(async () => {
        if (props.max == 0) {
            return;
        }
        const index = props.max - 1;
        props.Action(index);
    }, [props])

    return (
        <div className={styles.groupbuttonsnext}>
            <Button onClick={handleGetFirst}>{"|<"}</Button>
            <Button onClick={handleGetPrevious}>{"<<"}</Button>
            <Button onClick={handleGetNext}>{">>"}</Button>
            <Button onClick={handleGetLast}>{">|"}</Button>
        </div>
    );
};

