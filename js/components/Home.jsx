/* eslint jsx-a11y/no-static-element-interactions: 0 */ // --> OFF
/* eslint jsx-a11y/href-no-hash: 0 */ // --> OFF
/* eslint max-len: 0 */ // --> OFF
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { loginBtnStyle } from '../styles/styles';
import { redirectConsulta, redirectLogin, redirectContato } from '../actions/redirectActions';
import { theme } from './Theme';


class Login extends React.Component {
    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired
        })
    };

    static propTypes = {
        loggedUser: PropTypes.string.isRequired,
        loggedUserPass: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { loggedUser, loggedUserPass } = this.props;
        const { router } = this.context;
        const { dispatch } = this.props;
        if (loggedUser && loggedUserPass) {
            redirectConsulta(router, '', dispatch);
        }
    }

    componentDidUpdate() {
        const { loggedUser, loggedUserPass } = this.props;
        const { router } = this.context;
        const { dispatch } = this.props;
        if (loggedUser && loggedUserPass) {
            redirectConsulta(router, '', dispatch);
        }
    }

    redirLogin = () => {
        const { router } = this.context;
        const { dispatch } = this.props;
        redirectLogin(router, dispatch);
    };

    redirContato = () => {
        const { router } = this.context;
        const { dispatch } = this.props;
        redirectContato(router, dispatch);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={theme}>
                <div className="fill-parent login-bg vcenter" >
                    <div className="logobar" />
                    <div className="conteudo">
                        <strong>Conheça a Cristal</strong>

                        A Cristal é a segunda maior produtora de pigmento de Dióxido
                                de Titânio (TiO<sub>2</sub>) do mundo.<br />
                        <br />
                                Conta com sete fábricas de TiO<sub>2</sub> distribuídas em cinco continentes,
                                sendo duas plantas nos Estados Unidos, uma na Inglaterra, uma na França,
                                uma na Arábia Saudita, uma na Austrália e uma no Brasil.<br />
                        <br />
                                Para o processo de produção no Brasil, a Cristal conta com três unidades: a
                                Mina do Guajú, em Mataraca, na Paraíba; a fábrica em Camaçari, na Bahia; e o escritório
                                comercial em São Paulo, que atende a demanda de toda a América Latina.<br />
                        <br />
                                A planta da Bahia utiliza como principal matéria-prima o
                                minério de Titânio, ou Ilmenita, retirado da mina da Paraíba.<br />
                        <br />
                                Para entender o que é o minério, basta examinar um punhado
                                de areia da praia: nele, você encontrará grãos de diversas
                                cores. O mais preto de todos é a Ilmenita, que é trazida da mina da Paraíba
                                para a Planta da Bahia e transformado é um pigmento branco (TiO<sub>2</sub>) usado
                                para dar cor, brilho e poder de cobertura a uma vasta gama de produtos como tintas,
                                plásticos, papéis, borrachas e muitos outros.<br />
                        <br />
                                Além da Ilmenita, a Mina do Guajú também produz os
                                minérios Zirconita, Cianita e Rutilo.<br />
                        <br />
                                O pigmento produzido na Bahia, ou trazido de outras plantas da
                                Cristal no mundo, é comercializado no Brasil e em toda a América
                                Latina pelo escritório comercial da empresa localizado em São Paulo.<br />
                        <br />
                        <strong>Visão</strong> – Inspirados pelo brilhantismo do titânio, oferecemos
                                soluções de vanguarda que criam um mundo mais limpo e
                                brilhante para as gerações futuras.<br />
                        <br />
                        <strong>Missão</strong> – Nós nos empenhamos em potencializar
                                o brilho do titânio, de forma a oferecer grandes oportunidades e
                                ambientes seguros para as nossas comunidades. O nosso sucesso promoverá
                                o crescimento sustentável e compensador para a nossa equipe, nossos
                                clientes, parceiros, fornecedores e investidores.<br />
                        <br />
                        <strong>Valores:</strong><br />
                        <br />
                        <strong>Cuidado</strong> – A segurança é de fundamental importância
                                para os membros da Família Cristal e comunidades. Agimos de forma
                                aberta e justa em todas as nossas relações, respeitamos os outros
                                e valorizamos a diversidade. Consideramos cada um de nós responsável
                                por nossas ações e por nosso desempenho e temos um sentido pessoal
                                de propriedade do negócio.<br />
                        <br />
                        <strong>Colaboração</strong> – Nosso compromisso reside no trabalho
                                conjunto. Acreditamos na comunicação transparente e analisamos
                                as coisas sob diferentes pontos de vista, de maneira a realmente
                                compreender o que você necessita. Desta forma, podemos construir
                                uma equipe líder, capaz de oferecer a excelência.<br />
                        <br />
                        <strong>Paixão</strong> – Somos apaixonados pelo que fazemos,
                                indo longe para desafiar o <i>status quo</i>, num esforço
                                constante de melhoria. Nunca estamos satisfeitos com
                                resultados medianos e sempre impulsionamos os negócios para a
                                frente. Somos líderes em soluções inovadoras em titânio,
                                sendo inquisitivos e empreendedores.<br />
                        <br />
                        <strong>Profissionalismo</strong> – Nós demonstramos os mais altos
                                níveis de profissionalismo e integridade em tudo o que fazemos.
                                Estamos focados nos nossos objetivos empresariais e na obtenção
                                de bons resultados. Estamos constantemente aprendendo e utilizamos
                                o nosso conhecimento e habilidades especializadas para alcançar
                                nossas realizações.<br /><br />
                        <br /><br />
                    </div>
                    <div className="restrito">

                        <RaisedButton
                            fullWidth
                            label="Contato"
                            primary
                            style={loginBtnStyle}
                            onClick={this.redirContato}
                        />

                        <div className="spacer" />
                        <RaisedButton
                            fullWidth
                            label="Área Restrita"
                            primary
                            style={loginBtnStyle}
                            onClick={this.redirLogin}
                        />


                    </div>


                </div>
            </MuiThemeProvider>


        );
    }
}

const mapStateToProps = (state) => {
    const {
        dispatch,
        loginUserName,
        loginPassword,
        isLoading,
        loggedUser,
        loggedUserPass,
        loginErrorMsg
    } = state;

    return {
        dispatch,
        loginUserName,
        loginPassword,
        isLoading,
        loggedUser,
        loggedUserPass,
        loginErrorMsg
    };
};

export default connect(mapStateToProps)(Login);
