import React, { useState, useEffect, Dispatch } from 'react';
import styles from "./styles.module.scss";
import { Input } from '../ui/Input';
import { ICompany } from '../../interfaces/ICompany';

interface IPanelListCompany {
    companys: ICompany[],
    setCompany: Dispatch<React.SetStateAction<ICompany>>
    setIsPanelList: Dispatch<React.SetStateAction<Boolean>>
}

export default (props: IPanelListCompany) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    });
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);

    const handleMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true);
        setInitialX(event.clientX - position.x);
        setInitialY(event.clientY - position.y);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: event.clientX - initialX,
                y: event.clientY - initialY,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, setPosition]);
    console.log(position.x)
    return (
        <div className={styles.container}
            style={{ top: position.y, left: position.x }}
            onMouseDown={handleMouseDown}
        >
            <Input type="text" />
            <table className={styles.table} >
                <thead>
                    <tr>
                        <th>CNPJ</th>
                        <th>NOME</th>
                    </tr>
                </thead>
                <tbody>
                    {props.companys && props.companys.map((item, index) => {
                        return (
                            <tr key={item.id}
                                onClick={() => {
                                    props.setCompany(item);
                                    props.setIsPanelList(state => !state);
                                }}>
                                <td>{item.cnpj}</td>
                                <td>{item.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};
