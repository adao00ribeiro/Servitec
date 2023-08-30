import React, { useState } from 'react';
import styles from "./styles.module.scss";
import FormIdentidade from '../Forms/FormIdentidade';
import FormEndereco from '../Forms/FormEndereco';
import FormInformacoesPessoais from '../Forms/FormInformacoesPessoais';

const Tabs = () => {

    const [currentTab, setCurrentTab] = useState('1');
    const tabs = [
        {
            id: 1,
            tabTitle: 'Identidade',
            title: 'Title 1',
            content: <FormIdentidade />
        },
        {
            id: 2,
            tabTitle: 'Endereço',
            title: 'Title 2',
            content: <FormEndereco />
        },
        {
            id: 3,
            tabTitle: 'Informaçõoes Pessoais',
            title: 'Title 3',
            content: <FormInformacoesPessoais />
        },

    ];

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    return (
        <div className={styles.containerTabs}>
            <div className={styles.tabs}>
                {tabs.map((tab, i) =>
                    <button key={i} id={tab.id.toString()} disabled={currentTab === `${tab.id}`} onClick={(handleTabClick)}>{tab.tabTitle}</button>
                )}
            </div>
            <div >
                {tabs.map((tab, i) =>
                    <div key={i}>
                        {currentTab === `${tab.id}` &&
                            (tab.content)
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabs;