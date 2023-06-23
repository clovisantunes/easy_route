import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "@/components/Header";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import Router, { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { setupAPIClient } from "@/services/api";
import { Button } from "@/components/UI/Button/Index";
import MapPage from "@/components/Map";
import { toast } from "react-toastify";
import { FaAngleDown } from "react-icons/fa";

export default function Dashboard() {
  const router = useRouter();
  const apiClient = setupAPIClient();
  const {getWeatherForecast} = useContext(AuthContext);
  const [idCondutor, setDriverId] = useState("");
  const [idCliente, setClientId] = useState("");
  const [idVeiculo, setVeiculoId] = useState("");
  const [idRoute, setIdRoute] = useState("");
  const [fimDeslocamento, setFimDeslocamento] = useState("");
  const [observacao, setObservacao] = useState("");
  const [kmFinal, setKmFinal] = useState("");
  const [routeInfo, setRouteInfo] = useState({
    nome: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: ""
  });
  const [driverInfo, setDriverInfo] = useState({
    nomeCondutor: "",
    numeroHabilitacao: "",
    categoriaHabilitacao: "",
    vencimentoHabilitacao: ""
  });

  const [clientInfo, setClientInfo] = useState({
    nome: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: ""
  });

  const [weather, setWeather] = useState({
    data:"",
    temperatureC: "",
    temperatureF: "",
    summary: ""
});


  const [veiculoInfo, setVeiculoInfo] = useState({
    placa: "",
    marcaModelo: "",
    anoFabricacao: "",
    kmAtual: ""

  })

  const [expanded, setExpanded] = useState(false);
  const [expandedClient, setExpandedClient] = useState(false);
  const [expandedDriver, setExpandedDriver] = useState(false);
  const [expandedCar, setExpandedCar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const apiClient = setupAPIClient();
      const clientId = idCliente?.toString();
  
      if (clientId) {
        try {
          const response = await apiClient.get(`/Cliente/${clientId}`);
          const { nome, logradouro, numero, bairro, cidade, uf } = response.data;
  
          setClientInfo({
            nome,
            logradouro,
            numero,
            bairro,
            cidade,
            uf
          });
        } catch (error) {
          console.error("Erro ao buscar informações do cliente:", error);
        }
      }
    };
  
    fetchData();
  }, [idCliente]);

  useEffect(() => {
    const { idVeiculo, idCliente, idCondutor, idRoute } = router.query;
    if (idVeiculo) setVeiculoId(idVeiculo.toString());
    if (idCliente) setClientId(idCliente.toString());
    if (idCondutor) setDriverId(idCondutor.toString());
    if (idRoute) setIdRoute(idRoute.toString());
  }, [router.query]);

  useEffect(() => {
    const fetchData = async () => {
      
      const driverId = idCondutor;

      const response = await apiClient.get(`/Condutor/${driverId}`);

      const {
        id,
        nome,
        numeroHabilitacao,
        categoriaHabilitacao,
        vencimentoHabilitacao
      } = response.data;

      setDriverInfo((prevDriverInfo) => ({
        ...prevDriverInfo,
        nomeCondutor: nome,
        numeroHabilitacao,
        categoriaHabilitacao,
        vencimentoHabilitacao
      }));
    };

    fetchData();
  }, [idCondutor]);

  useEffect(() =>{
    const fetchDataCar = async () => {
        const veiculoId = idVeiculo;

        const response = await apiClient.get(`/Veiculo/${veiculoId}`);

        const {
          id,
          placa,
          marcaModelo,
          anoFabricacao,
          kmAtual
        } = response.data;

        setVeiculoInfo((prevCarInfo) =>({
          ...prevCarInfo,
          placa: placa,
          marcaModelo: marcaModelo,
          anoFabricacao: anoFabricacao,
          kmAtual: kmAtual
        }));
    };
    fetchDataCar();
  }, [idVeiculo]);



  async function handleSetRouter(id, kmFinal, fimDeslocamento, observacao) {
    try {
      const apiClient = setupAPIClient();
      const RouterId = idRoute;

      const routeData = {
        id: RouterId,
        kmFinal,
        fimDeslocamento,
        observacao
      };
      const response = await apiClient.put(
        `/Deslocamento/${RouterId}/EncerrarDeslocamento`,
        routeData
      );
      if (response.status === 200) {
        toast.success("Finalizado com sucesso");
        Router.push("/SelectClient");
      } else {
        toast.error("Erro ao finalziar.");
      }
    } catch (err) {
      console.log("Erro ao finalizar", err);
    }
  }

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await getWeatherForecast({
          data: "",
          temperatureC: 0,
          temperatureF: 0,
          summary: ""
        });
  
        const weatherData = response[0]; // Acessar o primeiro elemento do array
        const { temperatureC, temperatureF } = weatherData; // Extrair as propriedades temperatureC e temperatureF
  
        const weatherInfo = {
          data: weatherData.data,
          temperatureC: temperatureC.toString(), // Converter para string
          temperatureF: temperatureF.toString(), // Converter para string
          summary: weatherData.summary
        };
  
        setWeather(weatherInfo);
        console.log(weatherInfo);
      } catch (err) {
        console.log(err);
      }
    }
  
    fetchWeather();
  }, []);
  

  function handleClick() {
    handleSetRouter(idRoute, kmFinal, fimDeslocamento, observacao);
  }

  function handleOpenCard() {
    setExpanded((prevExpanded) => !prevExpanded);
  }

  function handleOpenCardClient() {
    setExpandedClient((prevExpandedClient) => !prevExpandedClient);
  }

  function handleOpenCardDriver() {
    setExpandedDriver((prevExpandedDriver) => !prevExpandedDriver);
  }
  function handleOpenCardCar() {
    setExpandedCar((prevExpandedCar) => !prevExpandedCar);
  }

  return (
    <>
      <Head>
        <title>Dashboard | Controle de rotas</title>
      </Head>
      <Navbar />
      <main className={styles.mainContainer}>
        <div className={styles.navLeft}>
          <Button
            type="button"
            className={styles.buttonExpanded}
            onClick={handleOpenCard}
          >
            Informação da Rota
            <FaAngleDown />
          </Button>
          <div
            className={`${styles.RouteCard} ${
              expanded ? styles.expandedRoute : ""
            }`}
          >
            <form>
              {Object.entries(routeInfo).map(([key, value]) => (
                <label key={key} htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                  <Input type="text" value={value} disabled />
                </label>
              ))}
              <label htmlFor="fimDeslocamento">
                Data:
                <Input
                  type="datetime-local"
                  value={fimDeslocamento}
                  onChange={(e) => setFimDeslocamento(e.target.value)}
                />
              </label>
              <label htmlFor="kmFinal">
                KM Final:
                <Input
                  type="number"
                  value={kmFinal}
                  onChange={(e) => setKmFinal(e.target.value)}
                />
              </label>
              
            </form>
          </div>

          <Button
            type="button"
            className={styles.buttonExpanded}
            onClick={handleOpenCardClient}
          >
            Informações do cliente
            <FaAngleDown />
          </Button>
          <div
            className={`${styles.ClientCard} ${
              expandedClient ? styles.expandedClient : ""
            }`}
          >
            <form>
              {Object.entries(clientInfo).map(([key, value]) => (
                <label key={key} htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                  <Input type="text" value={value} disabled />
                </label>
              ))}
            </form>
          </div>
          <Button
            type="button"
            className={styles.buttonExpanded}
            onClick={handleOpenCardDriver}
          >
            Informações do condutor
            <FaAngleDown />
          </Button>
          <div
            className={`${styles.DriverCard} ${
              expandedDriver ? styles.expandedDriver : ""
            }`}
          >
            <form>
              {Object.entries(driverInfo).map(([key, value]) => (
                <label key={key} htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                  <Input type="text" value={value} disabled />
                </label>
              ))}
            </form>
          </div>
          <Button
            type="button"
            className={styles.buttonExpanded}
            onClick={handleOpenCardCar}
          >
            Informações do Veiculo
            <FaAngleDown />
          </Button>
          <div
            className={`${styles.carCard} ${
              expandedCar ? styles.expandedCar : ""
            }`}
          >
            <form>
              {Object.entries(veiculoInfo).map(([key, value]) => (
                <label key={key} htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                  <Input type="text" value={value} disabled />
                </label>
              ))}
            </form>
          </div>
          <div className={styles.textArea}>
          <label htmlFor="observacao" >
                Observação
                <textarea
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </label>
              </div>
              <div>
                <Button type="button" onClick={handleClick}>
                  Finalizar
                </Button>
              </div>
              <div className={styles.weather}>
                <h3>{weather.data} {weather.temperatureC} {weather.temperatureF} {weather.summary}</h3>
              </div>
        </div>
        <div className={styles.mapContainer}>
          <MapPage />
        </div>
      </main>
    </>
  );
}

