import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import ChartGrid from './src/components/ChartGrid';

const screenWidth = Dimensions.get('window').width;

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Dados da página 1 e página 2
  const [sensorDataPage1, setSensorDataPage1] = useState([
    [10.5, 12.0, 11.2, 14.1],
    [9.8, 11.2, 13.3, 15.0],
    [7.4, 9.1, 11.0, 12.8],
    [6.3, 8.5, 10.2, 13.1],
    [5.6, 7.3, 9.5, 11.6],
    [8.9, 10.2, 12.5, 14.3],
  ]);
  
  const [sensorDataPage2, setSensorDataPage2] = useState([
    [11.5, 13.2, 12.5, 14.8],
    [9.0, 10.8, 12.3, 13.7],
    [8.2, 9.5, 11.1, 12.9],
    [7.1, 8.9, 10.0, 12.2],
    [10.4, 11.8, 13.9, 15.5],
    [6.9, 8.0, 9.5, 10.9],
  ]);

  const chartConfig = {
    backgroundColor: '#1F1D2B',
    backgroundGradientFrom: '#1F1D2B',
    backgroundGradientTo: '#3E3A5A',
    decimalPlaces: 2, // Número de casas decimais
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Cor dos dados no gráfico
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Cor dos números nos eixos
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 14, // Tamanho da fonte dos números
      fontWeight: 'bold', // Estilo da fonte dos números
    },
  };
  

  // Simular dados recebidos em tempo real para ambas as páginas
  useEffect(() => {
    const interval = setInterval(() => {
      // Atualizar dados da Página 1
      const newSensorDataPage1 = sensorDataPage1.map((data) => {
        const newData = data.map((value) => value + Math.random() * 2 - 1); // Variar os dados
        return newData;
      });
      setSensorDataPage1(newSensorDataPage1);

      // Atualizar dados da Página 2
      const newSensorDataPage2 = sensorDataPage2.map((data) => {
        const newData = data.map((value) => value + Math.random() * 2 - 1); // Variar os dados
        return newData;
      });
      setSensorDataPage2(newSensorDataPage2);

    }, 1000); // Atualiza a cada 1 segundo

    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
  }, [sensorDataPage1, sensorDataPage2]);

  const handleScroll = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Monitoramento de Sensores</Text>
      </View>

      {/* ScrollView horizontal para deslizar entre páginas */}
      <ScrollView horizontal pagingEnabled onScroll={handleScroll} scrollEventThrottle={16}>
        {/* Página 1 com gráficos 1-6 */}
        <View style={styles.page}>
          <ChartGrid sensorData={sensorDataPage1} chartConfig={chartConfig} page={0} />
        </View>

        {/* Página 2 com gráficos 7-12 */}
        <View style={styles.page}>
          <ChartGrid sensorData={sensorDataPage2} chartConfig={chartConfig} page={1} />
        </View>
      </ScrollView>

      {/* Indicador de páginas (bolinhas) */}
      <View style={styles.pagination}>
        <View style={[styles.dot, currentPage === 0 ? styles.activeDot : null]} />
        <View style={[styles.dot, currentPage === 1 ? styles.activeDot : null]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1D2B', // Fundo escuro
  },
  navbar: {
    backgroundColor: '#3E3A5A',
    paddingVertical: 15,
    alignItems: 'center',
  },
  navbarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  page: {
    width: screenWidth,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#514D73',
    marginHorizontal: 5,
    marginBottom: 25,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
});
