import Head from 'next/head'
import styles from './styles.module.scss'
import { Header } from '../../Components/Header'
import { SideBar } from '../../Components/sidebar'
import useCurrentScreen from '../../Store/useCurrentScreen'
import { ECurrentScreen } from '../../enums/ECurrentScreen'
import { CadastroPessoa } from '../../Components/CadastroPessoa'
import { canSSRAuth } from '../../utils/canSSRAuth'
import useUser from '../../Store/useUser'
import Perfil from '../../Components/Perfil'
import CadastroEmpresa from '../../Components/CadastroEmpresa'
import { CadastroContratoLocacao } from '../../Components/CadastroContratoLocacao'
import MesclarPdfs from './../../Components/MesclarPdfs/index'


export default function Dashboard() {
    const user = useUser(state => state.user)
    const setUser = useUser(state => state.setUser)
    const currentScreen = useCurrentScreen(state => state.current);

    return (
        <>
            <Head>
                <title>DashBoard</title>
                <meta name="description" content=" app delicia de fatia" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.container}>
                <Header />
                <div className={styles.containerMain}>
                    {user?.jobtitle == "ADMIN" &&
                        < SideBar />
                    }
                    {currentScreen == ECurrentScreen.CADASTROEMPRESA &&
                        <CadastroEmpresa />
                    }
                    {currentScreen == ECurrentScreen.CADASTROPESSOA &&
                        <CadastroPessoa></CadastroPessoa>
                    }
                    {currentScreen == ECurrentScreen.CADASTROCONTRATOLOCACAO &&
                        <CadastroContratoLocacao></CadastroContratoLocacao>
                    }
                    {currentScreen == ECurrentScreen.MESCLARPDFS &&
                        <MesclarPdfs></MesclarPdfs>
                    }
                    {currentScreen == ECurrentScreen.PERFIL &&
                        <Perfil />
                    }
                </div>
            </div >
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {

        }
    }
}
)
